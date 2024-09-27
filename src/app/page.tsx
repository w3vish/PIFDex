import { loadModules } from "@/lib/utils/pages";
import { PokemonCard } from "@/components/pages";

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
     <article className="md:px-2 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
     {data.results.map((pokemon: Pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.id}/>
      ))}
     </article>
  
  );
};

export default page;
