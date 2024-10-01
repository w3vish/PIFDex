import React from 'react'
import { Button } from '@/components/ui/button'

interface FusionControlsProps {
  loading: boolean
  headPokemon: boolean
  bodyPokemon: boolean
  onFuse: () => void
  onRandom: () => void
  onReset: () => void
}

export const FusionControls: React.FC<FusionControlsProps> = ({ loading, headPokemon, bodyPokemon, onFuse, onRandom, onReset }) => {
  return (
    <div className='grid grid-cols-3 max-w-xs md:max-w-sm lg:max-w-lg gap-2 md:gap-4 mx-auto flex-wrap'>
      <Button
        disabled={loading || !headPokemon || !bodyPokemon}
        onClick={onFuse}
        className='w-full'>
        {loading ? 'Loading...' : 'Fuse'}
      </Button>
      <Button
        variant={'outline'}
        disabled={loading}
        onClick={onRandom}
        className='w-full'>
        {loading ? 'Loading...' : 'Random'}
      </Button>
      <Button
        disabled={loading || (!headPokemon && !bodyPokemon)}
        variant="destructive"
        onClick={onReset}
        className='w-full'>
        {loading ? 'Loading...' : 'Reset'}
      </Button>
    </div>
  )
}
