import React from 'react'
import FusionPage from './FusionPage'
import { Metadata } from 'next'
import { gameInfo } from '@/lib/utils/constants'

export const metadata: Metadata = {
  title: {
    absolute: 'Pokémon Infinite Fusion Calculator - InfiniteFusion.org'
  },
  description: `Create Pokémon fusions by combining two Pokémon. Browse over 221,000 fusion combinations and 118,000+ custom pokemon fusions with 180,000+ sprites contributed by ${gameInfo.totalArtists.toLocaleString()}+ artists.`
}

function page() {
  return (
    <>
      <FusionPage />
    </>
  )
}

export default page