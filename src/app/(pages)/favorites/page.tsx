import React from 'react'
import FavoritesClient from './FavoritesClient'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Favorites',
  description: 'View and manage your favorite Pokémon sprites on this page.',
  robots: {
    index: false,
    follow: false
  }
}

function Page() {
  return <FavoritesClient />
}

export default Page
