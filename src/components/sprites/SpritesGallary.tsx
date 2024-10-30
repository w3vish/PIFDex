import { Card, CardHeader } from "@/components/ui/card";
import { generateArtistSlug, getSpriteImageURL } from "@/lib/utils";
import { placeHolders } from "@/lib/utils/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GridContent } from "../pages";

type Images = Array<{
  sprite_id: string;
  sprite_type: string;
  artists: string[];
}>;

interface SpritesGallaryProps {
  images: Images;
  label: string
}

const SpritesGallary = ({ images, label }: SpritesGallaryProps) => {
  return (
    <Card className="my-4 py-4">
      <CardHeader className="text-2xl text-center p-1">{label} ({images.length})</CardHeader>
      <GridContent>
        {images.map((image, index) => {
          const spriteURL =
            image.sprite_type === "autogen"
              ? `/${image.sprite_id}?sprite=autogen`
              : `/${image.sprite_id}`;
          return (
            <div key={index} className="pokemon-card">
              <div>
              </div>
              <div>
                <Link rel="nofollow" href={spriteURL} prefetch={false}>
                  <Image
                    src={getSpriteImageURL(image.sprite_id, image.sprite_type)}
                    alt={`${image.sprite_id || 'Pokemon'} Sprite Image`}
                    width={288}
                    height={288}
                  />
                </Link>
                <div>
                  <span>#{image.sprite_id.padStart(3, "0")}</span>
                  <span>
                    {image.artists && image.artists.length > 0 ? (
                      image.artists.map((artist, index) => (
                        <React.Fragment key={artist}>
                          {
                            artist === "Autogen" ? <span>{artist}</span> : <Link rel="nofollow" href={generateArtistSlug(artist)}>
                              {artist}
                            </Link>
                          }
                          {image.artists && image.artists.length - 1 > index && " & "}
                        </React.Fragment>
                      ))
                    ) : (
                      placeHolders.artistName
                    )}
                  </span>
                </div>
              </div>
              <div></div>
            </div>
          );
        })}
      </GridContent>
    </Card>
  );
};

export { SpritesGallary };
