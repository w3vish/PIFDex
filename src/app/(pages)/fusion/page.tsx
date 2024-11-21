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
  description: `Create Pokémon fusions by combining two Pokémon. Browse over 221,000 fusion combinations and 118,000+ custom pokemon fusions with 180,000+ sprites contributed by ${gameInfo.totalArtists.toLocaleString()}+ artists.`
}

function page() {
  return (
    <Card className="p-1 pb-4 space-y-4 md:m-4">
      <FusionPage />
      <Separator className='my-2'/>
    </Card>
  )
}

export default page