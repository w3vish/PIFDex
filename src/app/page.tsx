import { loadModules } from "@/lib/utils/pages";
import { GridContent, PokemonCard } from "@/components/pages";
import { gridClass } from "@/lib/utils/constants";

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
     <GridContent>
     {data.results.map((pokemon: Pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.id}/>
      ))}
     </GridContent>
  
  );
};

export default page;
