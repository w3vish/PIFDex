import { gameInfo } from '@/lib/utils/constants';
import React from 'react';

export const metadata = {
    title: "About Us",
    description: "Learn about InfiniteFusion.org, a fan-made resource for Pokémon Infinite Fusion. Discover fusion calculators, sprite collections, and our contributing artists.",
    keywords: ["about us", "pokemon fusion", "infinite fusion", "fan-made", "sprite artists", "fusion calculator"],
    robots: "index, follow",
    openGraph: {
      title: "About Us",
      description: "Find out what InfiniteFusion.org is all about. Explore fusion calculators, the sprite dex, and more.",
      url: "https://infinitefusion.org/about",
      type: "website",
    }
  }

function page() {
  return (
    <>
      <h1>About InfiniteFusion.org</h1>

      <div>
        InfiniteFusion.org is a fan-made website created for the Pokémon Infinite Fusion game. Our goal is to provide players with the tools and resources needed to explore and create unique Pokémon fusions. Whether you&apos;re looking to experiment with different combinations or simply browse through the countless sprites, this site is here to help you do that easily.
      </div>

      <div>
        With the Fusion Calculator, you can mix and match over {gameInfo.totalPokemons} Pokémon, leading to more than {gameInfo.totalSprites.toLocaleString()} possible fusion combinations. Of these, {gameInfo.totalCustomSprites.toLocaleString()} are custom-made by talented artists, giving each fusion a special and personal touch.
      </div>

      <div>
        The Fusion Dex and Artist Gallery showcase the creative work of over {gameInfo.totalArtists.toLocaleString()} contributing artists, featuring {gameInfo.totalCustomSprites.toLocaleString()} custom sprites out of {gameInfo.totalSprites.toLocaleString()} total fusions. This site is more than just a tool—it&apos;s a community dedicated to celebrating creativity within the Pokémon Infinite Fusion game.
      </div>
    </>
  );
}

export default page;
