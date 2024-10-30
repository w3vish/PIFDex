"use client"; // Required to interact with localStorage
import { useState, useEffect } from "react";
import { GridContent, PokemonCard } from "@/components/pages";
import { Separator } from "@/components/ui/separator"; 
import Link from "next/link";
import { PokemonCardData } from "@/lib/types/SpriteResponse";

  

const storageKey = "LikedSprites";

const FavoritesClient = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<PokemonCardData[]>([]);
 
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem(storageKey) || "[]");
    setFavoritePokemons(storedFavorites);
  }, []);
  

  useEffect(() => {
    if (favoritePokemons.length !== 0) {
      document.title = `Favorites (${favoritePokemons.length})`;
    }
  }, [favoritePokemons]);
  

  return (
    <div className="my-4">
      <h1 className="text-2xl font-bold m-4">Favorite Sprites ({favoritePokemons && favoritePokemons.length})</h1>
      
      <Separator className="mb-4" />

      {/* Show a message if no favorites are found */}
      {favoritePokemons.length === 0 ? (
        <div className="text-muted-foreground text-lg">
          <p>You don&lsquo;t have any favorite Pokémon sprites yet.</p>
          <Link rel="nofollow" href="/" className="underline">
            Explore Pokémon sprites to add some favorites!
          </Link>
        </div>
      ) : (
        <GridContent className='grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5'>
          {/* Render PokemonCard for each favorite Pokémon */}
          {favoritePokemons.map((pokemon: PokemonCardData) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </GridContent>
      )}
    </div>
  );
};

export default FavoritesClient;
