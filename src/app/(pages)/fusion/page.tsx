import React from 'react'
import FusionPage from './FusionPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Pokémon Infinite Fusion Calculator'
  },
  description: 'Create Pokémon fusions by combining two Pokémon. Browse over 221,000 fusion combinations and 118,000+ custom pokemon fusions with 180,000+ sprites contributed by 3,400+ artists.'
}

function page() {
  return (
    <>
      <FusionPage />
    </>
  )
}

export default page