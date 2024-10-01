import React from 'react'
import FusionPage from './FusionPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pokémon Infinite Fusion Calculator',
  description: 'Create Pokémon fusions by combining two Pokémon. Browse over 2,21,000 fusion combinations and 1,18,000+ custom sprites contributed by 3,400+ artists.'
}

function page() {
  return (
    <>
      <FusionPage />
    </>
  )
}

export default page