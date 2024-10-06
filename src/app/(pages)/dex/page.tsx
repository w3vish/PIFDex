import { GridContent, PokemonCard } from '@/components/pages';
import { Card, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PokemonCardTypes } from '@/lib/types';
import { loadModules } from '@/lib/utils';
import { gameInfo } from '@/lib/utils/constants';
import React from 'react';

export const metadata = {
  title: "Pokémon Infinite Fusion Dex",
  description: `Explore over ${gameInfo.totalSprites.toLocaleString()} Pokémon fusions, with more than ${gameInfo.spritesWithCustomSprites.toLocaleString()} fusions featuring custom sprites. The dex includes a total of ${gameInfo.totalCustomSprites.toLocaleString()} custom-generated sprites for the Pokémon Infinite Fusion fan game.`,
};

async function page() {
  const dexData: any = await loadModules("home");

  return (
    <div className='space-y-4'>
      <CardHeader>
      <h1 className="text-2xl font-bold">Pokémon Infinite Fusion Dex</h1>
      <p className="text-sm  lg:text-base text-muted-foreground">
        Explore over {gameInfo.totalSprites.toLocaleString()} Pokémon fusions, with more than {gameInfo.spritesWithCustomSprites.toLocaleString()} fusions featuring custom sprites. The dex includes a total of {gameInfo.totalCustomSprites.toLocaleString()}+ custom-generated sprites for the Pokémon Infinite Fusion fan game.
        </p>
      </CardHeader>
      <article className='space-y-2'>
      <Separator />
        <h2 className='text-xl text-center font-semibold'>Base Pokemons ({gameInfo.totalPokemons})</h2>
        <GridContent>
          {dexData.results.map((pokemon: PokemonCardTypes) => (
            <PokemonCard pokemon={pokemon} key={pokemon.id} />
          ))}
        </GridContent>
      </article>
    </div>
  );
}

export default page;
