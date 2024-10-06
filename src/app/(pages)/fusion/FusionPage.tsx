"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { basePokemons, gameInfo } from '@/lib/utils/constants'
import { loadFusion } from '@/lib/utils'
import { SelectedPokemon, SpriteResponse, SpriteResult } from '@/lib/types'
import { FusionControls, FusionResult, FusionSelector } from '@/components/fusion'

const generateRandomId = (): string => {
  const maxPoke = gameInfo.totalPokemons
  return (Math.floor(Math.random() * maxPoke) + 1).toString()
}

const fetchData = async (ids: string): Promise<SpriteResponse | null> => {
  const res = await loadFusion(ids)
  return res
}

export default function FusionPage() {
  const [headPokemon, setHeadPokemon] = useState<SelectedPokemon | null>(null)
  const [bodyPokemon, setBodyPokemon] = useState<SelectedPokemon | null>(null)
  const [fusionData, setFusionData] = useState<SpriteResponse | null>(null)
  const [headData, setHeadData] = useState<SpriteResult | null>(null)
  const [bodyData, setBodyData] = useState<SpriteResult | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [fusionStatus, setFusionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const toast = useToast()

  const handleSelectPokemon = (type: 'head' | 'body') => (id: string, name: string) => {
    if (type === 'head') {
      setHeadPokemon({ id, name })
    } else {
      setBodyPokemon({ id, name })
    }
  }

  const generateFusionIds = (headId: string, bodyId: string): { fusionId: string, reverseId: string } => {
    return { fusionId: `${headId}.${bodyId}`, reverseId: `${bodyId}.${headId}` }
  }

 
  const calculateFusion = async (headId?: string, bodyId?: string): Promise<void> => {
    setLoading(true)
    setFusionStatus('loading')

    headId = headId || headPokemon?.id
    bodyId = bodyId || bodyPokemon?.id

    if (!headId || !bodyId) {
      toast.toast({
        title: "Selection Error",
        description: "Please select both a head and body Pokémon before fusing.",
        duration: 3000
      })
      setLoading(false)
      setFusionStatus('idle')
      return
    }

    try {
      const data = await fetchData(`${headId}.${bodyId}`)
      if (!data?.results) {
        toast.toast({
          title: "Fusion Error",
          description: "Failed to load fusion data. Please try again later.",
          duration: 3000
        })
        setFusionData(null)
        setFusionStatus('error')
      } else {
        setFusionData(data)
        const { fusionId, reverseId } = generateFusionIds(headId, bodyId)
        const head = data.results.find(item => item.id === fusionId)
        const body = data.results.find(item => item.id === reverseId)

        setHeadData(head || null)
        setBodyData(body || null)
        setFusionStatus('success')
      }
    } catch (error) {
      toast.toast({
        title: "Fusion Error",
        description: "An unexpected error occurred. Please try again.",
        duration: 3000
      })
      setFusionStatus('error')
    } finally {
      setLoading(false)
    }
  }

  const randomFusion = (): void => {
    const headId = generateRandomId()
    let bodyId = generateRandomId()

    while (headId === bodyId) {
      bodyId = generateRandomId()
    }

    setHeadPokemon({ id: headId, name: basePokemons[headId] })
    setBodyPokemon({ id: bodyId, name: basePokemons[bodyId] })
    calculateFusion(headId, bodyId)
  }


  const handleReset = (): void => {
    setHeadPokemon(null)
    setBodyPokemon(null)
    setFusionData(null)
    setFusionStatus('idle')
  }

  useEffect(() => {
    randomFusion()
  }, [])

  return (
    <Card className="p-2 space-y-4 m-1 md:m-4">
           <CardHeader className='p-1 px-2 text-center'>
        <h1 className='text-2xl'>Pokémon Infinite Fusion Calculator</h1>
        <CardDescription className="text-sm md:text-base">
          Select a head and body from two different Pokémon to generate a fusion. Over 170,000 custom designs available.
        </CardDescription>
      </CardHeader>

      {/* Pokemon Selection */}
      <FusionSelector 
        headPokemon={headPokemon}
        bodyPokemon={bodyPokemon}
        handleSelectPokemon={handleSelectPokemon}
      />

      {/* Controls (Fuse, Random, Reset) */}
      <FusionControls 
        loading={loading} 
        headPokemon={!!headPokemon} 
        bodyPokemon={!!bodyPokemon}
        onFuse={() => calculateFusion()}
        onRandom={randomFusion}
        onReset={handleReset}
      />

      {/* <Separator /> */}

      {/* Fusion Result Display */}
      <FusionResult 
        fusionStatus={fusionStatus}
        headData={headData}
        bodyData={bodyData}
      />
    </Card>
  )
}
