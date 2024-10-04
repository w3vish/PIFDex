import React from 'react'
import { ArtistsTable } from '@/components/artists'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Artists",
  description: `Explore the list of all artists who contributed to Pokémon Infinite Fusion’s unique sprites. You can filter the list to find your favorite artists and even explore the sprites they created.`,

  
}

function page() {
  return (
    <><ArtistsTable /></>
  )
}

export default page