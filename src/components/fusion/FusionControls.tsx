import React from 'react'
import { Button } from '@/components/ui/button'
import { SelectedPokemon } from '@/lib/types'

interface FusionControlsProps {
  loading: boolean
  headPokemon: SelectedPokemon | null
  bodyPokemon: SelectedPokemon | null
  fusedHeadPokemon: SelectedPokemon | null
  fusedBodyPokemon: SelectedPokemon | null
  fusionStatus: 'idle' | 'loading' | 'success' | 'error'
  onFuse: () => void
  onRandom: () => void
  onReset: () => void
}

export const FusionControls: React.FC<FusionControlsProps> = ({
  loading,
  headPokemon,
  bodyPokemon,
  fusedHeadPokemon,
  fusedBodyPokemon,
  fusionStatus,
  onFuse,
  onRandom,
  onReset,
}) => {
  const areSamePokemon = 
    fusionStatus === 'success' &&
    fusedHeadPokemon?.id === headPokemon?.id &&
    fusedBodyPokemon?.id === bodyPokemon?.id;

  const isFuseDisabled = 
    loading || 
    !headPokemon || 
    !bodyPokemon || 
    areSamePokemon;

  const getFuseButtonText = () => {
    if (loading) return 'Loading...'
    if (areSamePokemon) return 'Fused'
    return 'Fuse'
  }
  
  return (
    <div className='grid grid-cols-3 max-w-xs md:max-w-sm lg:max-w-lg gap-2 md:gap-4 mx-auto flex-wrap'>
      <Button
        disabled={loading}
        variant={'outline'}
        onClick={onReset}
        className='w-full'>
        {loading ? 'Loading...' : 'Reset'}
      </Button>
      <Button
        variant={'outline'}
        disabled={loading}
        onClick={onRandom}
        className='w-full'>
        {loading ? 'Loading...' : 'Random'}
      </Button>
      <Button
        disabled={isFuseDisabled}
        variant={'outline'}
        onClick={onFuse}
        className='w-full'>
        {getFuseButtonText()}
      </Button>
    </div>
  )
}