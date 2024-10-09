import React from 'react'

import { SelectedPokemon } from '@/lib/types'
import { Shuffle } from 'lucide-react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { SelectPokemon } from './SelectPokemon'
import { basePokemons } from '@/lib/utils/constants'

interface FusionSelectorProps {
  headPokemon: SelectedPokemon | null
  bodyPokemon: SelectedPokemon | null
  handleSelectPokemon: (type: 'head' | 'body') => (id: string, name: string) => void
  randomHead: () => void // Assuming it doesn't take any arguments and returns void
  randomBody: () => void // Same assumption here
}




export const FusionSelector: React.FC<FusionSelectorProps> = ({ headPokemon, bodyPokemon, handleSelectPokemon, randomHead, randomBody }) => {
  return (
    <div className='grid mx-auto gap-4 lg:gap-8 grid-cols-1 md:grid-cols-2 max-w-80 md:max-w-screen-md'>

      <div>
        <Label className='ml-2 w-full'>Head Pokemon</Label>
        <div className='flex w-full'>
          <SelectPokemon
            selectedPokemon={headPokemon}
            onSelect={handleSelectPokemon('head')}
            pokemons={basePokemons}
          />
          <Button onClick={randomHead} size={'icon'} variant={'outline'} className='rounded-l-none'>
            <Shuffle/>
          </Button>
        </div>
      </div>
      <div>
        <Label className='ml-2 w-full'>Body Pokemon</Label>
        <div className='flex w-full'>
          <SelectPokemon
            selectedPokemon={bodyPokemon}
            onSelect={handleSelectPokemon('body')}
            pokemons={basePokemons}
          />

          <Button onClick={randomBody} size={'icon'} variant={'outline'} className='rounded-l-none'>
            <Shuffle />
          </Button>
        </div>
      </div>

    </div>

  )
}
