import Image from "next/image";
import { PokemonCard } from "../pages";

// Shared interface for image data
interface PokemonImageData {
  sprite_id: string;
  sprite_type: string;
  artists: string[];
  creation_date: string;
  last_update_date?: string;
  comments: string | null;
}

// Interface for the Pokemon data used in both components
interface PokemonData {
  id: string;
  name?: string;
  types?: string[];
  base_pokemons: { [key: string]: string };
  total_sprites?: number;
  head_fusions?: number;
  body_fusions?: number;
  images?: PokemonImageData[];
  spriteType: 'base' | 'fusion' | 'autogen' | 'triple';
  hasCustomSprite: boolean;
}

interface SpriteImageProps {
  pokemon: PokemonData;
  types: string[];
}

const SpriteImage: React.FC<SpriteImageProps> = ({ pokemon, types }) => {
  return (
    <div>
      <PokemonCard pokemon={pokemon} isMainImage={true} />
      <div className="text-muted-foreground text-base gap-1 flex justify-center mx-4 my-2">
        {types.map((type) => (
          <Image
            key={type}
            src={`/images/type/${type.toLowerCase()}.png`}
            className="w-16 rounded-sm"
            alt={type}
            width={96}
            height={32}
          />
        ))}
      </div>
    </div>
  );
};

export { SpriteImage };
