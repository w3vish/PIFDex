import React from "react";
import Link from "next/link";
import Image from "next/image";
import { generateArtistSlug } from "@/lib/utils/artists";
import { processTypes } from "@/lib/utils";
import { getSpriteImageURL } from "@/lib/utils";
import { placeHolders } from "@/lib/utils/constants";
import { Separator } from "../ui/separator";

interface PokemonData {
    id: string;
    name?: string;
    primary_type?: string;
    secondary_type?: string;
    base_pokemons: { [key: string]: string };
    total_sprites?: number;
    head_fusions?: number;
    body_fusions?: number;
    images?: {
        sprite_id: string;
        sprite_type: string;
        artists: string[];
    }[];
}

type SpriteType = 'base' | 'fusion' | 'triples' | 'autogen'

function FusionImage({ pokemon }: { pokemon: PokemonData }) {
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


    const ids: string[] = pokemon.id.split('.');

    // Updated logic to prioritize 'autogen' over the ID structure
    const spriteType: SpriteType = primaryImage.sprite_type === 'autogen'
        ? 'autogen'
        : ids.length === 2
            ? 'fusion'
            : ids.length === 3
                ? 'triples'
                : 'base';
    const types = pokemon.primary_type || pokemon.secondary_type
        ? Array.from(new Set([
            ...(pokemon.primary_type ? processTypes(pokemon.primary_type) : []),
            ...(pokemon.secondary_type ? processTypes(pokemon.secondary_type) : [])
        ]))
        : [];


    return (
        <>
            <div className="pokemon-card max-w-xs">
                <div>
                    {/* {pokemon.name && (
                        <h2><Link rel="nofollow" prefetch={false} href={`/${pokemon.id}`}>{pokemon.name}</Link></h2>
                    )} */}
                    {/* {types.length > 0 && (
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
                )} */}
                </div>
                <div>

                    <Link rel="nofollow" className="size-72" prefetch={false} href={`/${pokemon.id}`}>
                        <Image
                            src={getSpriteImageURL(primaryImage.sprite_id, spriteType)}
                            alt={`${pokemon.name || 'Pokemon'} Sprite Image`}
                            width={288}
                            height={288}
                            className="aspect-square"
                        />
                    </Link>

                    <div>
                        <span><Link prefetch={false} href={primaryImage.sprite_id.padStart(3, "0")}>#{primaryImage.sprite_id.padStart(3, "0")}</Link></span>
                        <span className="text-ellipsis overflow-hidden">
                            {primaryImage.artists && primaryImage.artists.length > 0 ? (
                                primaryImage.artists.map((artist, index) => (
                                    <React.Fragment key={artist}>
                                        {
                                            artist === "Autogen" ? <span>{artist}</span> : <Link rel="nofollow" prefetch={false} href={generateArtistSlug(artist)}>
                                                {artist}
                                            </Link>
                                        }
                                        {primaryImage.artists && primaryImage.artists.length - 1 > index && " & "}
                                    </React.Fragment>
                                ))
                            ) : (
                                placeHolders.imageName
                            )}
                        </span>
                    </div>
                </div>
                {(pokemon.head_fusions !== undefined
                    || pokemon.base_pokemons !== undefined
                    || pokemon.total_sprites !== undefined) && <Separator />}
                <div>

                    {pokemon.total_sprites !== undefined && (
                        <p>
                            <span>Variants:</span>
                            <span>{pokemon.total_sprites}</span>
                        </p>
                    )}
                </div>
            </div>
            <div className="flex flex-wrap items-center justify-center my-2 gap-1">
                {types.map((type) => (
                    <Image
                        key={type}
                        src={`/images/type/${type.toLowerCase()}.png`}
                        alt={type}
                        width={96}
                        height={32}
                        className="w-full max-w-16 h-auto my-auto rounded-sm"
                    />
                ))}
            </div>
        </>
    );
}

export { FusionImage };