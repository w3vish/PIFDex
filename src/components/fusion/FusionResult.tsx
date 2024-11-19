import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PokemonCard } from '../pages';
import { FusionImage } from './FusionImage';
import { FusionStats } from './FusionStats';
import { FusionAbilities } from './FusionAbilities';
import { generateStats } from '@/lib/utils/fusion';
import { FusionWeaknesses } from './FusionWeaknesses';
import { Skeleton } from '../ui/skeleton';
import { SpriteResponse } from '@/lib/types';

interface FusionResultProps {
  fusionStatus: 'idle' | 'loading' | 'success' | 'error';
  headData: SpriteResponse | null;
  bodyData: SpriteResponse | null;
}

export function FusionResult({ fusionStatus, headData, bodyData }: FusionResultProps) {
  if (fusionStatus === 'loading') {
    return <FusionLoading />;
  }

  if (fusionStatus === 'error') {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load fusion data. Please try again.</AlertDescription>
      </Alert>
    );
  }

  if (fusionStatus === 'idle') {
    return (
      <div className="text-center p-4">
        <p>Select Pokémon to fuse or click random fusion!</p>
      </div>
    );
  }

  if (fusionStatus === 'success' && headData && bodyData) {
    return (
      <article className='space-y-6 sm:p-4 max-w-4xl mx-auto'>

        <div className="grid grid-cols-2 gap-1 sm:gap-4">
          <div>
            <p className='text-center mb-1 text-sm'>{headData.name}</p>
            <FusionImage pokemon={headData} />
          </div>
          <div>
            <p className='text-center mb-1 text-sm'>{bodyData.name}</p>
            <FusionImage pokemon={bodyData} />
          </div>
        </div>
        <div className="grid grid-cols-2 justify-between gap-2 md:gap-8 md:px-4">
          <FusionStats stats={generateStats(headData)} comparisonStats={generateStats(bodyData)} />
          <FusionStats stats={generateStats(bodyData)} comparisonStats={generateStats(headData)} />
        </div>
        <div className="grid grid-cols-2 gap-2 md:gap-8 md:px-4">
          <FusionAbilities ability={headData.abilities} />
          <FusionAbilities ability={bodyData.abilities} />

        </div>

        <div>
          <FusionWeaknesses types={{
            headTypes: headData.types,
            bodyTypes: bodyData.types
          }} />
        </div>
      </article>
    );
  }

  return null;
}

function FusionLoading() {
  return (
    <article className='space-y-6 sm:p-4 max-w-4xl mx-auto animate-pulse'>
      <div className="grid grid-cols-2 gap-4 sm:gap-8">
        {[0, 1].map((index) => (
          <Card key={index} className='p-1 md:p-4 max-w-xs mx-auto w-full'>
            <CardContent className="p-0">
              <Skeleton className="min-h-40 md:h-64  mb-3" />
              {[0, 1].map((statIndex) => (
                <div key={statIndex} className="flex items-center mb-2">
                  <Skeleton className="h-4 w-20 mr-2" />
                  <Skeleton className="h-4 flex-grow" />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 md:gap-8">
        {[0, 1].map((index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <Skeleton className="h-5 w-1/2 mb-3" />
              {[0, 1, 2, 3, 4, 5].map((statIndex) => (
                <div key={statIndex} className="flex items-center mb-2">
                  <Skeleton className="h-4 w-20 mr-2" />
                  <Skeleton className="h-4 flex-grow" />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 md:gap-8">
        {[0, 1].map((index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <Skeleton className="h-5 w-1/3 mb-3" />
              <Skeleton className="h-4 w-2/3 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent className="p-4">
          <Skeleton className="h-5 w-1/4 mb-3" />
          <div className="flex flex-col gap-2">
            {[0, 1, 2, 3, 4].map((index) => (
              <Skeleton key={index} className="h-10 mb-2" />

            ))}
          </div>
        </CardContent>
      </Card>
    </article>
  );
}