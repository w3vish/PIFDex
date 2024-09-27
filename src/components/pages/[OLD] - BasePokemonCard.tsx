import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { generateArtistSlug } from "@/lib/utils/artists";

interface PokemonData {
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

const typeColors: { [key: string]: { bg: string; text: string } } = {
    normal: { bg: "bg-gray-200", text: "text-gray-700" },
    fire: { bg: "bg-red-200", text: "text-red-800" },
    water: { bg: "bg-blue-200", text: "text-blue-800" },
    grass: { bg: "bg-green-200", text: "text-green-800" },
    electric: { bg: "bg-yellow-200", text: "text-yellow-800" },
    ice: { bg: "bg-blue-100", text: "text-blue-600" },
    fighting: { bg: "bg-red-300", text: "text-red-900" },
    poison: { bg: "bg-purple-200", text: "text-purple-800" },
    ground: { bg: "bg-yellow-300", text: "text-yellow-900" },
    flying: { bg: "bg-blue-100", text: "text-blue-600" },
    psychic: { bg: "bg-pink-200", text: "text-pink-800" },
    bug: { bg: "bg-green-300", text: "text-green-900" },
    rock: { bg: "bg-yellow-400", text: "text-yellow-900" },
    ghost: { bg: "bg-purple-300", text: "text-purple-900" },
    dragon: { bg: "bg-indigo-200", text: "text-indigo-800" },
    dark: { bg: "bg-gray-400", text: "text-gray-900" },
    steel: { bg: "bg-gray-300", text: "text-gray-900" },
    fairy: { bg: "bg-pink-100", text: "text-pink-600" },
};

export default function BasePokemonCard({ pokemon }: { pokemon: PokemonData }) {
    return (
        <Card className="w-full max-w-xs mx-auto">
            <CardHeader className="p-2 pb-2">
                <div className="flex gap-1 justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold">
                            <Link href={`/${pokemon.id}`}>
                                {pokemon.name}
                            </Link>
                        </h2>
                    </div>
                    <div className="flex gap-1 justify-center">
                        {/* Primary Type */}
                        <Badge
                            className={`whitespace-nowrap overflow-hidden text-ellipsis ${typeColors[pokemon.primary_type.toLowerCase()].bg} ${typeColors[pokemon.primary_type.toLowerCase()].text} px-1 py-1 rounded-md hover:bg-current/10`}
                        >
                            {pokemon.primary_type}
                        </Badge>
                        {/* Secondary Type (if different from Primary) */}
                        {pokemon.primary_type !== pokemon.secondary_type && (
                            <Badge
                                className={`whitespace-nowrap overflow-hidden text-ellipsis ${typeColors[pokemon.secondary_type.toLowerCase()].bg} ${typeColors[pokemon.secondary_type.toLowerCase()].text} px-1 py-1 rounded-md hover:bg-current/10`}
                            >
                                {pokemon.secondary_type}
                            </Badge>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-2 relative">
                <Link prefetch={false} href={`/${pokemon.id}`}>
                    <img
                        src={`https://cdn.jsdelivr.net/gh/ViSurya/PIFDexFiles/graphics/base/${pokemon.id}.png`}
                        alt={`${pokemon.name} Sprite Image`}
                        className="mx-auto max-w-52 h-52 object-contain mb-2"
                    />
                </Link>
                <div className="flex justify-between absolute bottom-2 left-4 right-4">
                    <span className="text-muted-foreground text-sm">#{pokemon.id.padStart(3, "0")}</span>
                    {pokemon.images?.[0]?.artists && (
                        <span className="text-sm text-right">
                            <Link
                                prefetch={false}
                                className="border-b-2 border-b-gray-300"
                                href={`/artists/${generateArtistSlug(pokemon.images[0].artists[pokemon.images[0].artists.length - 1])}`}
                            >
                                {pokemon.images[0].artists[pokemon.images[0].artists.length - 1]}
                            </Link>
                        </span>
                    )}

                </div>
            </CardContent>
            <Separator />
            <CardFooter className="p-4 flex flex-col gap-2 text-sm">
                <div className="flex justify-between w-full">
                    <span>Fusions:</span>
                    <span>{pokemon.head_fusions + pokemon.body_fusions}</span>
                </div>
                <div className="flex justify-between w-full text-muted-foreground">
                    <span>As Head:</span>
                    <span>{pokemon.head_fusions} / 470</span>
                </div>
                <div className="flex justify-between w-full text-muted-foreground">
                    <span>As Body:</span>
                    <span>{pokemon.body_fusions} / 470</span>
                </div>
                <div className="flex justify-between w-full">
                    <span>Variants:</span>
                    <span>{pokemon.total_sprites}</span>
                </div>
            </CardFooter>
        </Card>
    );
}
