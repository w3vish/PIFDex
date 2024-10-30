import React from "react";
import Link from "next/link";
import Image from "next/image";
import { generateArtistSlug } from "@/lib/utils/artists";
import { getMainSpriteId } from "@/lib/utils";
import { getSpriteImageURL } from "@/lib/utils";
import { gameInfo, placeHolders } from "@/lib/utils/constants";
import { Separator } from "../ui/separator";
import { PokemonCardData } from "@/lib/types/SpriteResponse";

interface PokemonData {
  id: string;
  name?: string;
  types?: string[];
  base_pokemons: { [key: string]: string };
  total_sprites?: number;
  TotalFusionsAsHead?: number;
  TotalFusionsAsBody?: number;
  images?: {
    sprite_id: string;
    sprite_type: string;
    artists: string[];
    creation_date: string;
    last_update_date?: string;
    comments: string | null;
  }[];
  spriteType: 'base' | 'fusion' | 'autogen' | 'triple';
  hasCustomSprite: boolean;
}

function PokemonCard({ pokemon }: { pokemon: PokemonCardData }) {
  const imagesArray = Array.isArray(pokemon.images)
    ? pokemon.images
    : pokemon.images
    ? [pokemon.images]
    : [];
  const autogenImage = {
    sprite_id: pokemon.id,
    sprite_type: "autogen" as const,
    artists: ["Autogen"],
    creation_date: new Date().toISOString(),
    last_update_date: new Date().toISOString(),
    comments: null
  };

  const primaryImage = (imagesArray.length === 0)
    ? autogenImage
    : imagesArray.find((image) => image.sprite_id === pokemon.id)
    || imagesArray[0]
    || autogenImage;

  const ids: string[] = pokemon.id.split('.').map((id) => getMainSpriteId(id));

  const spriteType = pokemon.spriteType;
  const types = pokemon.types || [];

  return (
    <div className="pokemon-card">
      <div>
        {pokemon.name && (
          <h3>
            <Link rel="nofollow" prefetch={false} href={`/${pokemon.id}`}>
              {pokemon.name}
            </Link>
          </h3>
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
        <Link rel="nofollow" prefetch={false} href={`/${pokemon.id}`}>
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
                <React.Fragment key={`${artist}-${index}`}>
                  {artist === "Autogen" ? (
                    <span>{artist}</span>
                  ) : (
                    <Link rel="nofollow" prefetch={false} href={generateArtistSlug(artist)}>
                      {artist}
                    </Link>
                  )}
                  {primaryImage.artists.length - 1 > index && " & "}
                </React.Fragment>
              ))
            ) : (
              placeHolders.artistName
            )}
          </span>
        </div>
      </div>
      {(pokemon.TotalFusionsAsHead
        || pokemon.base_pokemons
        || pokemon.total_sprites) && <Separator />}
      <div>
        {pokemon.TotalFusionsAsHead && pokemon.base_pokemons && (
          <>
            <p>
              <span>Fusions:</span>
              <span>{Number(pokemon.TotalFusionsAsHead) + Number(pokemon.TotalFusionsAsBody)}</span>
            </p>
            <p className="text-muted-foreground">
              <span>As Head:</span>
              <span>{pokemon.TotalFusionsAsHead} / {gameInfo.totalPokemons}</span>
            </p>
            <p className="text-muted-foreground">
              <span>As Body:</span>
              <span>{pokemon.TotalFusionsAsBody} / {gameInfo.totalPokemons}</span>
            </p>
          </>
        )}
        {(spriteType === 'fusion' || spriteType === 'autogen') && (
          <p>
            <span>Fusion of</span>
            <span className="text-muted-foreground">
              <Link rel="nofollow" prefetch={false} href={`/${ids[0]}`}>
                {pokemon.base_pokemons[ids[0]]}
              </Link>
              /
              <Link rel="nofollow" prefetch={false} href={`/${ids[1]}`}>
                {pokemon.base_pokemons[ids[1]]}
              </Link>
            </span>
          </p>
        )}
        {spriteType === 'triple' && (
          <p>
            <span>Fusion of</span>
            <span className="text-muted-foreground">
              {ids.map((id, index) => (
                <React.Fragment key={id}>
                  <Link rel="nofollow" prefetch={false} className="border-b" href={`/${id}`}>
                    {pokemon.base_pokemons[id]}
                  </Link>
                  {ids.length - 1 > index && " / "}
                </React.Fragment>
              ))}
            </span>
          </p>
        )}
        {pokemon.total_sprites !== undefined && (
          <p>
            <span>Variants:</span>
            <span>{pokemon.total_sprites}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default PokemonCard;
