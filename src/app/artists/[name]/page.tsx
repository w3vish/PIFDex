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

  // Title: Keeping artist's name in lowercase but with proper phrasing
  let title = `spirtes by ${decodeURIComponent(params.name)}`;

  // Append page number if available
  if (searchParams.page !== undefined) title += ` - page ${searchParams.page}`;

  // Return metadata with description, keeping the artist's name as is (lowercase)
  return {
    title: title,
    description: `Browse all sprites created by ${params.name} and explore their artistic style.`,
    robots: {
      index: false, // Ensure the page is not indexed
    },
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


  if (artistData.total_sprites === 0 || artistData.images.length === 0) {
    notFound();
  }


  const mappedPokemonData = artistData.images.map((pokemon: any) => ({
    id: pokemon.sprite_id,
    name: pokemon.base_pokemons[Object.keys(pokemon.base_pokemons)[0]],
    primary_type: pokemon.primary_type,
    secondary_type: pokemon.secondary_type,
    base_pokemons: pokemon.base_pokemons,
    total_sprites: pokemon.total_sprites,
    images: [
      {
        sprite_id: pokemon.sprite_id,
        sprite_type: '',
        artists: pokemon.artists || [artistData.artist_name],
      },
    ],
  }));

  const totalPages = artistData.pagination.total_pages;
  const currentPage = artistData.pagination.current_page;
  const limit = loadArtistsProps.limit;

  return (
    <>
      <Card className=''>
        <CardHeader className='text-center'>
          <h1 className='text-2xl'>
            {artistData.total_sprites} Sprites by{' '}
            <span className='text-muted-foreground hover:border-b'>{artistData.artist_name}</span>
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
          {mappedPokemonData.map((pokemon: any) => (
            <PokemonCard pokemon={pokemon} key={pokemon.id} />
          ))}
        </GridContent>

        <footer className='mt-4'>
          {/* Render the client-side pagination component */}
          <PaginationClient currentPage={currentPage} totalPages={totalPages} limit={limit} />
        </footer>
      </Card>
    </>
  );
};

export default ArtistsPage;
