import { Card, CardHeader } from '@/components/ui/card';
import { loadArtists } from '@/lib/utils/api';
import { notFound } from 'next/navigation';
import React from 'react';
import { decodeArtistSlug } from '@/lib/utils';
import { GridContent, PokemonCard } from '@/components/pages';
import { PaginationClient } from '@/components/pages';
import { artistPlaceholder } from '@/lib/utils/constants';
import { SelectSpritesLimit } from '@/components/artists';
import { Metadata, ResolvingMetadata } from 'next';

// Define params as a Promise
type ArtistsPageParams = Promise<{
  name: string;
}>;

// Define searchParams as a Promise
type ArtistsPageSearchParams = Promise<{
  limit?: string;
  page?: string;
}>;

export async function generateMetadata(
  { 
    params, 
    searchParams 
  }: { 
    params: ArtistsPageParams; 
    searchParams: ArtistsPageSearchParams; 
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Await params and searchParams
  const { name } = await params;
  const { page } = await searchParams;
  const decodedName = decodeURIComponent(name);
  
  let title = `sprites by ${decodedName}`;
  if (page !== undefined) title += ` - page ${page}`;
  
  return {
    title: title,
    description: `Browse all sprites created by ${decodedName} and explore their artistic style.`,
    robots: { index: false },
  };
}

export default async function ArtistsPage({ 
  params, 
  searchParams 
}: { 
  params: ArtistsPageParams; 
  searchParams: ArtistsPageSearchParams; 
}) {
  // Await params and searchParams
  const { name } = await params;
  const { limit: limitParam, page: pageParam } = await searchParams;

  // Decode and validate artist name
  const artistName = decodeArtistSlug(name);
  if (!artistName) return <p>Invalid Artist Name</p>;

  // Prepare load artists props with awaited and converted search params
  const loadArtistsProps = {
    artistName,
    limit: Number(limitParam) || artistPlaceholder.limit,
    page: Number(pageParam) || artistPlaceholder.page,
  };

  // Rest of the existing implementation remains the same
  const artistData = await loadArtists(loadArtistsProps);

  // Handle no results
  if (artistData.totalImages === 0 || artistData.data.length === 0) {
    notFound();
  }

  // Destructure pagination info
  const { totalPages, currentPage, limit } = artistData.pagination;

  return (
    <Card className=''>
      <CardHeader className='text-center'>
        <h1 className='text-2xl'>
          {artistData.totalImages} Sprites by{' '}
          <span className='text-muted-foreground hover:border-b'>{artistData.artistName}</span>
        </h1>
      </CardHeader>
      <div className='flex justify-between p-4'>
        <p className='self-center pt-6 md:self-end md:text-lg font-semibold'>
          <span>Page ({currentPage}/{totalPages})</span>
        </p>
        <div className='ml-auto'>
          <SelectSpritesLimit />
        </div>
      </div>
      <GridContent>
        {artistData.data.map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.id} />
        ))}
      </GridContent>
      <footer className='mt-4'>
        <PaginationClient currentPage={currentPage} totalPages={totalPages} limit={limit} />
      </footer>
    </Card>
  );
}