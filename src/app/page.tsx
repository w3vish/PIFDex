import HeroSection from "@/components/Home/Hero";
import { GridContent, PokemonCard } from "@/components/pages";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { gameInfo } from "@/lib/utils/constants";
import { loadModules } from "@/lib/utils/pages";
import { Metadata } from "next";

export const metadata = {
  title: "Pokémon Infinite Fusion Dex & Tools - InfiniteFusion.org",
  description: `Discover and explore ${gameInfo.totalSprites.toLocaleString()} Pokémon fusions with over ${gameInfo.totalCustomSprites.toLocaleString()} custom sprites in our comprehensive Fusion Dex. Use the Fusion Calculator and other tools for the Pokémon Infinite Fusion fan game.`,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://infinitefusion.org",
    siteName: "InfiniteFusion.org",
    title: "Pokémon Infinite Fusion Dex & Tools - InfiniteFusion.org",
    description: `InfiniteFusion.org offers a detailed Fusion Dex with over ${gameInfo.totalSprites.toLocaleString()} Pokémon fusion combinations and ${gameInfo.totalCustomSprites.toLocaleString()} custom sprites. Access tools like the Pokémon Fusion Calculator and more.`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Pokémon Infinite Fusion Dex & Tools",
    description: `Explore over ${gameInfo.totalSprites.toLocaleString()} Pokémon fusion possibilities and ${gameInfo.totalCustomSprites.toLocaleString()} custom sprites with tools for the Pokémon Infinite Fusion game.`,
  },
};


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
      <h2 className="text-xl text-center font-semibold my-2">Base Pokemons ({gameInfo.totalPokemons})</h2>
      <GridContent>
        {data.results.map((pokemon: Pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.id} />
        ))}
      </GridContent>
    </>

  );
};

export default page;
