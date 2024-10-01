import React from 'react'
import { PokemonSelector } from './PokemonSelector'
import { SelectedPokemon } from '@/lib/types'

interface FusionSelectorProps {
  headPokemon: SelectedPokemon | null
  bodyPokemon: SelectedPokemon | null
  handleSelectPokemon: (type: 'head' | 'body') => (id: string, name: string) => void
}

export const FusionSelector: React.FC<FusionSelectorProps> = ({ headPokemon, bodyPokemon, handleSelectPokemon }) => {
  return (
    <div className='grid mx-auto gap-4 lg:gap-8 grid-cols-1 md:grid-cols-2 max-w-80 md:max-w-screen-md'>
      <PokemonSelector
        label="Head Pokemon"
        selectedPokemon={headPokemon}
        onSelect={handleSelectPokemon('head')}
      />
      <PokemonSelector
        label="Body Pokemon"
        selectedPokemon={bodyPokemon}
        onSelect={handleSelectPokemon('body')}
      />
    </div>
  )
}
