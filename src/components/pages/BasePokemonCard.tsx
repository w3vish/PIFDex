import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { generateArtistSlug } from "@/lib/utils/artists";
import { processTypes } from "@/lib/utils/types";
import Image from "next/image";
import React from "react";
import { getSpriteImageURL } from "@/lib/utils";
import { placeHolders } from "@/lib/utils/constants";


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

type SpriteType = 'base' | 'fusion' | 'triples' | 'autogen'


export default function BasePokemonCard({ pokemon }: { pokemon: PokemonData }) {
    const imagesArray = Array.isArray(pokemon.images)
    ? pokemon.images
    : pokemon.images
      ? [pokemon.images]
      : [];

  const autogenImage = {
    sprite_id: pokemon.id,
    sprite_type: "autogen" as 'autogen',
    artists: ["Autogen"],
  };

  const primaryImage = (imagesArray.length === 0)
  ? autogenImage // If the images array is empty, use autogenImage
  : imagesArray.find((image) => image.sprite_id === pokemon.id) // Match sprite_id with pokemon.id
    || imagesArray[0] // If no match, use the first image in the array
    || autogenImage; // Fallback to autogenImage if everything else fails


  const idLength = pokemon.id.split('.').length;
  const spriteType: SpriteType = !pokemon.images ? 'autogen' : idLength === 2 ? 'fusion' : idLength === 3 ? 'triples' : 'base';

  const types = pokemon.primary_type || pokemon.secondary_type
    ? Array.from(new Set([
      ...(pokemon.primary_type ? processTypes(pokemon.primary_type) : []),
      ...(pokemon.secondary_type ? processTypes(pokemon.secondary_type) : [])
    ]))
    : [];

    return (
        <div className="pokemon-card">
            <div>
                {pokemon.name && (
                    <h2><Link href={`/${pokemon.id}`}>{pokemon.name}</Link></h2>
                )}
                {types.length > 0 && (
                    <div>
                        {types.map((type) => (
                            <Image
                                key={type}
                                src={`/images/type/${type.toLowerCase()}.png`}
                                alt={type}
                                width={96}
                                height={32}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div>
                <Link href={`/${pokemon.id}`}>
                    <Image
                        src={getSpriteImageURL(primaryImage.sprite_id, spriteType)}
                        alt={`${pokemon.name || 'Pokemon'} Sprite Image`}
                        width={288}
                        height={288}
                    />
                </Link>
                <div>
                    <span>#{primaryImage.sprite_id.padStart(3, "0")}</span>
                    <span>
                        {primaryImage.artists && primaryImage.artists.length > 0 ? (
                            primaryImage.artists.map((artist, index) => (
                                <React.Fragment key={artist}>
                                    <Link href={generateArtistSlug(artist)} prefetch={false}>
                                        {artist}
                                    </Link>
                                    {primaryImage.artists && primaryImage.artists.length - 1 > index && " & "}
                                </React.Fragment>
                            ))
                        ) : (
                            placeHolders.imageName
                        )}
                    </span>
                </div>
            </div>
            <div></div>
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
        </div>
    );
}
