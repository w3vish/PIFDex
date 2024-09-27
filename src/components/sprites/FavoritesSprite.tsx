"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

interface PokemonData {
  id: string;
  name: string;
  primary_type?: string;
  secondary_type?: string;
  base_pokemons: { [key: string]: string };
  total_sprites: number;
  images: {
    sprite_id: string;
    sprite_type: string;
    artists: string[];
  };
}

const storageKey = "LikedSprites";

interface LikeSpriteProps {
  pokemonData: PokemonData; // Pass full Pokemon data, including images
}

const FavoritesSprite = ({ pokemonData }: LikeSpriteProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const likedSprites = JSON.parse(localStorage.getItem(storageKey) || "[]");

    // Check if the current sprite is already liked
    const isSpriteLiked = likedSprites.some(
      (sprite: PokemonData) => sprite.id === pokemonData.id
    );
    setIsLiked(isSpriteLiked);
  }, [pokemonData.id]);

  const toggleLike = () => {
    let likedSprites = JSON.parse(localStorage.getItem(storageKey) || "[]");

    if (isLiked) {
      // Remove the sprite if it's already liked
      likedSprites = likedSprites.filter(
        (sprite: PokemonData) => sprite.id !== pokemonData.id
      );
      localStorage.setItem(storageKey, JSON.stringify(likedSprites));
      setIsLiked(false);
      toast({
        title: `Removed from favorites`, // Title must be a string
        description: (
          <>
            Sprite #{pokemonData.id} ({pokemonData.name}) has been removed from
            your favorites. Check your{" "}
            <Link href="/favorites" className="underline">
              favorites
            </Link>.
          </>
        ),
        duration: 2000,
      });
    } else {
      // Add the sprite to the liked list with its entire data, including images
      likedSprites.push(pokemonData);
      localStorage.setItem(storageKey, JSON.stringify(likedSprites));
      setIsLiked(true);
      toast({
        title: `Added to favorites`, // Title must be a string
        description: (
          <>
            Sprite #{pokemonData.id} ({pokemonData.name}) has been added to
            your favorites. Check your{" "}
            <Link href="/favorites" className="underline">
              favorites
            </Link>.
          </>
        ),
        duration: 2000,
      });
    }
  };

  return (
    <Button
      size="icon"
      variant="outline"
      className="size-8 my-auto mx-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors"
      onClick={toggleLike}
    >
      <Heart
        className={`size-5 transition-all ${
          isLiked ? "fill-red-500 text-red-500" : "fill-none text-foreground"
        }`}
      />
    </Button>
  );
};

export { FavoritesSprite };
