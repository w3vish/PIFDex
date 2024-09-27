import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { generateArtistSlug } from "@/lib/utils/artists";
import { processTypes } from "@/lib/utils/types";
import Image from "next/image";
import { getSpriteImageURL } from "@/lib/utils";
import { placeHolders } from "@/lib/utils/constants";
import React from "react";

interface PokemonData {
  id: string;
  name: string;
  primary_type: string;
  secondary_type: string;
  base_pokemons: { [key: string]: string };
  total_sprites: number;
  images: {
    sprite_id: string;
    sprite_type: string;
    artists: string[];
  }[];
}

type SpriteType = 'base' | 'fusion' | 'triples' | 'autogen'

export default function PokemonCard({ pokemon }: { pokemon: PokemonData }) {
  // Handle cases where images is null or an object
  const imagesArray = Array.isArray(pokemon.images) 
    ? pokemon.images 
    : pokemon.images 
      ? [pokemon.images]  // Convert object to an array
      : [];  // Initialize as empty array if null

  const autogenImage = {
    sprite_id: pokemon.id,
    sprite_type: "autogen" as 'autogen',
    artists: ["Autogen"],
  };

  // Find the primary image, using autogenImage as fallback
  const primaryImage = pokemon.total_sprites === 0
    ? autogenImage
    : imagesArray.find((image) => image.sprite_id === pokemon.id) || autogenImage;

  const idLength = pokemon.id.split('.').length;
  const spriteType = pokemon.total_sprites === 0 ? 'autogen' : idLength === 2 ? 'fusion' : idLength === 3 ? 'triples' : 'base';

  const types = Array.from(
    new Set([...processTypes(pokemon.primary_type), ...processTypes(pokemon.secondary_type)])
  );

  return (
    <Card className="w-full max-w-sm mx-auto">
        <div className="flex gap-1 justify-between m-3">
            <h2 className="text-lg lg:text-base text-muted-foreground font-semibold justify-start">
              <Link href={`/${pokemon.id}`}>
               {pokemon.name}
              </Link>
            </h2>
          <div className="flex flex-wrap justify-end gap-1">
            {types.map((type: string) => (
              <Image
                key={type}
                src={`/images/type/${type.toLowerCase()}.png`}
                className="w-16 h-max items-center justify-center my-auto rounded-sm"
                alt={type}
                width={96}
                height={32}
              />
            ))}
          </div>
        </div>
      <div className="p-4 pt-2 relative">
        <Link prefetch={false} href={`/${pokemon.id}`}>
          <Image
            src={getSpriteImageURL(pokemon.id, spriteType)}
            alt={`${pokemon.name} Sprite Image`}
            className="mx-auto max-w-52 h-52 object-contain mb-2"
            width={288}
            height={288}
          />
        </Link>
        <div className="flex justify-between absolute bottom-2 left-4 right-4  text-sm">
          <span className="text-muted-foreground">#{pokemon.id.padStart(3, "0")}</span>
          {primaryImage?.artists && (
            <span className="text-right">
              {primaryImage.artists.map((artist, index) => (
                <React.Fragment key={artist}>
                  <Link
                    href={generateArtistSlug(artist)}
                    className="border-b-2 border-b-gray-300"
                  >
                    {artist}
                  </Link>
                  {primaryImage.artists.length - 1 > index && " & "}
                </React.Fragment>
              ))}
            </span>
          ) || <span className="text-right">{placeHolders.imageName}</span>}
        </div>
      </div>
      <Separator />
      <div className="p-2 px-4 flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <span>Variants:</span>
          <span>{pokemon.total_sprites}</span>
        </div>
      </div>
    </Card>
  );
}