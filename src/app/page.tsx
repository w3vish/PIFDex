import HeroSection from "@/components/Home/Hero";
import { GridContent, PokemonCard } from "@/components/pages";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { gameInfo } from "@/lib/utils/constants";
import { loadModules } from "@/lib/utils/pages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "InfiniteFusion.org - Pokémon Infinite Fusion Sprite Dex",
  description: "Explore 221,390 Pokémon fusions and 170,000+ custom sprites at InfiniteFusion.org, a fan-driven Dex for the Pokémon Infinite Fusion game with contributions from over 3,400 artists.",
}

interface Pokemon {
  id: string;
  name: string;
  primary_type: string;
  secondary_type: string;
  base_pokemons: { [key: string]: string };
  total_sprites: number;
  head_fusions: number;
  body_fusions: number;
  images: {
    sprite_id: string;
    sprite_type: string;
    artists: string[];
  }[];
}

const page = async () => {
  const data: any = await loadModules("home");

  return (
    <>
      <HeroSection />
      <Separator className="my-4" />
      <h2 className="text-xl mx-4 my-2">Base Pokemons</h2>
      <GridContent>
        {data.results.map((pokemon: Pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.id} />
        ))}
      </GridContent>
    </>

  );
};

export default page;
