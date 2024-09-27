// components/SpriteImage.tsx
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { getSpriteImageURL, generateArtistSlug } from "@/lib/utils";
import { placeHolders } from "@/lib/utils/constants";
import Image from "next/image";

// Define the props type
interface SpriteImageProps {
    primaryImage: {
        sprite_id: string;
        sprite_type: string;
        artists: string[];
    };
    pokemonName: string;
    types: string[];
}

const SpriteImage: React.FC<SpriteImageProps> = ({ primaryImage, pokemonName, types }) => {
    return (
        <div>
            <figure className="mb-2 p-2 mx-auto max-w-[305px] rounded-lg bg-gray-100 dark:bg-gray-800">
                <img
                    src={getSpriteImageURL(primaryImage.sprite_id, primaryImage.sprite_type)}
                    alt={pokemonName}
                    className="mx-auto w-fix h-fit max-w-80 max-h-80 object-contain"
                    width={288}
                    height={288}
                />
                <Separator className="bg-gray-200 dark:bg-gray-700" />
                <div className="flex justify-between">
                    <span className="text-muted-foreground text-base">
                        #{primaryImage.sprite_id.padStart(3, "0")}
                    </span>
                    <div className="text-right ml-4 mr-1 block">
                        {primaryImage.artists?.map((artist: string, index: number) => (
                            <span key={artist} content={artist}>
                                {artist === "Autogen" ? (
                                    <>{artist}</>
                                ) : (
                                    <>
                                        {" "}
                                        <Link
                                            href={generateArtistSlug(artist)}
                                            className="border-b border-gray-500"
                                        >
                                            {artist}
                                        </Link>{" "}
                                        {primaryImage.artists.length - 1 > index && " & "}
                                    </>
                                )}
                            </span>
                        )) || placeHolders.artistName}
                    </div>
                </div>
            </figure>
            <div className="text-muted-foreground text-base gap-1 flex justify-center mx-4">
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
