import React from 'react';

export const metadata = {
    title: "Disclaimer",
    description: "Read the disclaimer for InfiniteFusion.org. This website is a fan-made resource and is not affiliated with Nintendo, Game Freak, or The Pokémon Company.",
    keywords: ["disclaimer", "pokemon fusion", "infinite fusion", "fan-made", "nintendo", "game freak", "the pokemon company"],
    robots: "index, follow",
    openGraph: {
      title: "Disclaimer",
      description: "InfiniteFusion.org is a fan-made website and is not affiliated with Nintendo, Game Freak, or The Pokémon Company. Read our full disclaimer.",
      url: "https://infinitefusion.org/disclaimer",
      type: "website",
    }
  }

function DisclaimerPage() {
  return (
    <>
      <h1>Disclaimer</h1>

      <div>
        InfiniteFusion.org is a fan-made website and is not affiliated with, endorsed, sponsored, or specifically approved by Nintendo, Game Freak, or The Pokémon Company. All Pokémon images, names, and related media displayed on this website are the intellectual property of their respective owners.
      </div>

      <div>
        Pokémon Infinite Fusion is a fan-made game. This website is designed as a resource for the game&apos;s community and the artists who contribute to it. It is purely for entertainment purposes and aims to support the Pokémon Infinite Fusion fan community by providing helpful tools and content.
      </div>

      <div>
        Any custom sprites and designs showcased here are the work of our contributing artists and are used with permission. If you believe your intellectual property rights are being infringed, please contact us directly.
      </div>
    </>
  );
}

export default DisclaimerPage;
