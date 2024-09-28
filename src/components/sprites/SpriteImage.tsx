// components/SpriteImage.tsx
import Image from "next/image";
import { PokemonCard } from "../pages";

interface SpriteImageProps {
    pokemon: {
        id: string;
        base_pokemons: { [key: string]: string };
        images: {
            sprite_id: string;
            sprite_type: string;
            artists: string[];
        }[],
    }
    types: string[];
}

const SpriteImage: React.FC<SpriteImageProps> = ({ pokemon, types }) => {
    return (
        <div>
            <PokemonCard pokemon={pokemon} />
            <div className="text-muted-foreground text-base gap-1 flex justify-center mx-4 my-2">
                {types.map((type: string) => (
                    <Image
                        key={type}
                        src={`/images/type/${type.toLowerCase()}.png`}
                        className="w-16 rounded-sm"
                        alt={type}
                        width={96}
                        height={32} />
                ))}
            </div>
        </div>
    );
};

export { SpriteImage };
