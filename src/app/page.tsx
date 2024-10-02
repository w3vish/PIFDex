import HeroSection from "@/components/Home/Hero";
import { GridContent, PokemonCard } from "@/components/pages";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { gameInfo } from "@/lib/utils/constants";
import { loadModules } from "@/lib/utils/pages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pokémon Infinite Fusion Dex | InfiniteFusion.org",
  description: "Discover 221,390 unique Pokémon fusions and explore 170,000+ custom sprites at InfiniteFusion.org. Your ultimate resource for the Pokémon Infinite Fusion game, featuring a comprehensive Dex and fusion calculator.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://infinitefusion.org",
    siteName: "InfiniteFusion.org",
    title: "Pokémon Infinite Fusion Dex & Tools",
    description: "Explore 221,390 Pokémon fusions, 170,000+ custom sprites, and tools for the Pokémon Infinite Fusion fan game.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pokémon Infinite Fusion Dex & Tools"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pokémon Infinite Fusion Dex & Tools",
    description: "Explore 221,390 Pokémon fusions, 170,000+ custom sprites, and tools for the Pokémon Infinite Fusion fan game.",
    images: ["/og-image.jpg"],
  },
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
