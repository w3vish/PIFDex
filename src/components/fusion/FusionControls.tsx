import React from 'react';
import { Button } from '@/components/ui/button';
import { SelectedPokemon } from '@/lib/types';
import { RotateCw, Shuffle, Zap } from 'lucide-react';

interface FusionControlsProps {
  loading: boolean;
  headPokemon: SelectedPokemon | null;
  bodyPokemon: SelectedPokemon | null;
  fusedHeadPokemon: SelectedPokemon | null;
  fusedBodyPokemon: SelectedPokemon | null;
  fusionStatus: 'idle' | 'loading' | 'success' | 'error';
  onFuse: () => void;
  onRandom: () => void;
  onReset: () => void;
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
    if (loading) return 'Loading...';
    if (areSamePokemon) return 'Fused';
    return 'Fuse';
  };

  return (
    <div className="grid grid-cols-3 max-w-xs md:max-w-sm lg:max-w-lg gap-2 md:gap-4 mx-auto flex-wrap">
      <Button
        disabled={loading}
        variant="outline"
        onClick={onReset}
        className="w-full bg-background hover:bg-muted/80 dark:border border-2 border-border transition-colors duration-200 text-foreground font-medium flex items-center justify-center gap-2"
      >
        <RotateCw className="h-4 w-4" />
        {loading ? 'Loading...' : 'Reset'}
      </Button>
      
      <Button
        variant="outline"
        disabled={loading}
        onClick={onRandom}
        className="w-full bg-background hover:bg-muted/80 dark:border border-2 border-border transition-colors duration-200 text-foreground font-medium flex items-center justify-center gap-2"
      >
        <Shuffle className="h-4 w-4" />
        {loading ? 'Loading...' : 'Random'}
      </Button>
      
      <Button
        disabled={isFuseDisabled}
        onClick={onFuse}
        className={`w-full transition-all duration-200 font-medium flex items-center justify-center gap-2
          ${isFuseDisabled 
            ? 'bg-muted text-muted-foreground cursor-not-allowed' 
            : areSamePokemon
              ? 'bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 text-white'
              : 'bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 dark:from-violet-600 dark:to-indigo-600 dark:hover:from-violet-700 dark:hover:to-indigo-700 text-white'
          }`}
      >
        <Zap className="h-4 w-4" />
        {getFuseButtonText()}
      </Button>
    </div>
  );
};