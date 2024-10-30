import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { loadArtists } from '@/lib/utils/api';
import { notFound } from 'next/navigation';
import React from 'react';
import { decodeArtistSlug } from '@/lib/utils';
import { GridContent, PokemonCard } from '@/components/pages';
import { PaginationClient } from '@/components/pages';
import { artistPlaceholder, gridClass } from '@/lib/utils/constants';
import { SelectSpritesLimit } from '@/components/artists';
import { Metadata, ResolvingMetadata } from 'next';

export const runtime = 'edge';

interface ArtistsPageProps {
  params: {
    name: string;
  };
  searchParams: {
    limit?: number;
    page?: number;
  };
}

export async function generateMetadata(
  { params, searchParams }: ArtistsPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  let title = `sprites by ${decodeURIComponent(params.name)}`;
  if (searchParams.page !== undefined) title += ` - page ${searchParams.page}`;
  return {
    title: title,
    description: `Browse all sprites created by ${params.name} and explore their artistic style.`,
    robots: { index: false },
  };
}

const ArtistsPage = async ({ params, searchParams }: ArtistsPageProps) => {
  const artistName = decodeArtistSlug(params.name);
  if (!artistName) return <p>Invalid Artist Name</p>;

  const loadArtistsProps = {
    artistName,
    limit: Number(searchParams.limit) || artistPlaceholder.limit,
    page: Number(searchParams.page) || artistPlaceholder.page,
  };

  const artistData = await loadArtists(loadArtistsProps);
  if (artistData.totalImages === 0 || artistData.data.length === 0) {
    notFound();
  }

  // Map the artist data to match the updated structure


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
};

export default ArtistsPage;
