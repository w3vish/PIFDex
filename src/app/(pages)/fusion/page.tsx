import React from 'react'
import FusionPage from './FusionPage'
import { Metadata } from 'next'
import { gameInfo } from '@/lib/utils/constants'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: {
    absolute: 'Pokémon Infinite Fusion Calculator - InfiniteFusion.org'
  },
  description: `Create Pokémon fusions by combining two Pokémon. Browse over 221,000 fusion combinations and 118,000+ custom pokemon fusions with 180,000+ sprites contributed by ${gameInfo.totalArtists.toLocaleString()}+ artists.`,
  openGraph: {
    title: 'Pokémon Infinite Fusion Calculator',
    description: `Create Pokémon fusions by combining two Pokémon. Browse over 221,000 fusion combinations and 118,000+ custom pokemon fusions with 180,000+ sprites contributed by ${gameInfo.totalArtists.toLocaleString()}+ artists.`,
    url: 'https://infinitefusion.org/fusion',
    siteName: 'InfiniteFusion.org',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og/infinite-fusion-calculator.png',
        width: 1263,
        height: 871,
        alt: 'Pokémon Infinite Fusion Calculator Interface'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pokémon Infinite Fusion Calculator',
    description: `Create Pokémon fusions by combining two Pokémon. Browse over 221,000 fusion combinations and custom sprites.`,
    images: ['/images/og/infinite-fusion-calculator.png'],
  }
}

function page() {
  return (
    <Card className="p-1 pb-4 space-y-4 md:m-4 bg-[hsl(220,20%,98%)] dark:bg-[hsl(220,20%,12%)] text-[hsl(220,15%,10%)] dark:text-[hsl(0,0%,90%)]">
      <FusionPage />
      <Separator className="my-2" />
    </Card>
  );
}

export default page;

