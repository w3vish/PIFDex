"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardDescription } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { basePokemons, gameInfo } from '@/lib/utils/constants'
import { loadFusion } from '@/lib/utils'
import { APIResponse, SelectedPokemon, SpriteResponse } from '@/lib/types'
import { FusionControls, FusionResult, FusionSelector } from '@/components/fusion'
import { siteURL } from '@/lib/utils/constants/urls'
import { Separator } from '@/components/ui/separator'

const generateRandomId = (): string => {
  const maxPoke = gameInfo.totalPokemons
  return (Math.floor(Math.random() * maxPoke) + 1).toString()
}

const fetchData = async (ids: string): Promise<APIResponse | null> => {
  const res = await loadFusion(ids)
  return res
}

export default function FusionPage() {
  // Selected Pokemon states
  const [headPokemon, setHeadPokemon] = useState<SelectedPokemon | null>(null)
  const [bodyPokemon, setBodyPokemon] = useState<SelectedPokemon | null>(null)

  // Currently fused Pokemon states
  const [fusedHeadPokemon, setFusedHeadPokemon] = useState<SelectedPokemon | null>(null)
  const [fusedBodyPokemon, setFusedBodyPokemon] = useState<SelectedPokemon | null>(null)

  // Fusion result states
  const [fusionData, setFusionData] = useState<SpriteResponse[] | null>(null)
  const [headData, setHeadData] = useState<SpriteResponse | null>(null)
  const [bodyData, setBodyData] = useState<SpriteResponse | null>(null)

  // UI states
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

  const calculateFusion = async (headId?: string, bodyId?: string): Promise<void> => {
    setLoading(true)
    setFusionStatus('loading')

    const currentHeadId = headId || headPokemon?.id
    const currentBodyId = bodyId || bodyPokemon?.id

    if (!currentHeadId || !currentBodyId) {
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
      const data = await fetchData(`${currentHeadId}.${currentBodyId},${currentBodyId}.${currentHeadId}`)
      if (!data) {
        toast.toast({
          title: "Fusion Error",
          description: "Failed to load fusion data. Please try again later.",
          duration: 3000
        })
        setFusionData(null)
        setFusionStatus('error')
      } else {
        // Update fusion data
        setFusionData(data.results)
        const fusionId = `${currentHeadId}.${currentBodyId}`
        const reverseId = `${currentBodyId}.${currentHeadId}`
        const head = data.results.find(item => item.id === fusionId)
        const body = data.results.find(item => item.id === reverseId)

        setHeadData(head || null)
        setBodyData(body || null)

        // Update fused Pokemon state
        setFusedHeadPokemon({ id: currentHeadId, name: basePokemons[currentHeadId] })
        setFusedBodyPokemon({ id: currentBodyId, name: basePokemons[currentBodyId] })

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
    setFusedHeadPokemon(null)
    setFusedBodyPokemon(null)
    setFusionData(null)
    setHeadData(null)
    setBodyData(null)
    setFusionStatus('idle')
  }


  useEffect(() => {
    const headId = generateRandomId()
    let bodyId = generateRandomId()

    while (headId === bodyId) {
      bodyId = generateRandomId()
    }

    setHeadPokemon({ id: headId, name: basePokemons[headId] })
    setBodyPokemon({ id: bodyId, name: basePokemons[bodyId] })
  }, [])

  return (
    <>
      <CardHeader className='p-1 px-2 text-center'>
        <h1 className='text-2xl'>Pokémon Infinite Fusion Calculator</h1>
        <CardDescription className="text-sm md:text-base">
          Select a head and body from two different Pokémon to generate a fusion. Over 170,000 custom designs available.
        </CardDescription>
      </CardHeader>

      <FusionSelector
        headPokemon={headPokemon}
        bodyPokemon={bodyPokemon}
        handleSelectPokemon={handleSelectPokemon}
        randomHead={() => {
          const headId = generateRandomId()
          setHeadPokemon({ id: headId, name: basePokemons[headId] })
          if (bodyPokemon) calculateFusion(headId, bodyPokemon.id)
        }}
        randomBody={() => {
          const bodyId = generateRandomId()
          setBodyPokemon({ id: bodyId, name: basePokemons[bodyId] })
          if (headPokemon) calculateFusion(headPokemon.id, bodyId)
        }}
      />

      <FusionControls
        loading={loading}
        headPokemon={headPokemon}
        bodyPokemon={bodyPokemon}
        fusedHeadPokemon={fusedHeadPokemon}
        fusedBodyPokemon={fusedBodyPokemon}
        fusionStatus={fusionStatus}
        onFuse={() => calculateFusion()}
        onRandom={randomFusion}
        onReset={handleReset}
      />

      <FusionResult
        fusionStatus={fusionStatus}
        headData={headData}
        bodyData={bodyData}
      />

      <Separator />
      <article className='prose dark:prose-invert px-2 md:px-6 min-w-full pt-8'>
        <p>The Pokemon Infinite Fusion Calculator lets you combine two Pokemon to create unique fusions. You can choose one Pokemon as the “Head” and another as the “Body,” and the calculator will show you the fusion result along with a reverse fusion (swapping the head and body).</p>
        <p>The fusion result includes a sprite, calculated stats, abilities, and type effectiveness. If a custom sprite exists for the fusion, the artist&#39;s name is shown at the bottom right of the image. If no custom sprite is available, the calculator uses an auto-generated (Autogen) sprite, which is also labeled.</p>
        <p>On the right side of the fusion result, you'll see the Fusion Dex ID. Clicking on the sprite will take you to a detailed page with more information about that specific fusion.</p>
        <p>Below the image, you'll find the fusion's stats, such as HP, Attack, Defense, Sp. Atk, Sp. Def, and Speed. You'll also see the Normal and Hidden Abilities for the fusion. Hover over or click the “i” icon next to an ability to read its description.</p>
        <p>At the bottom, the tool displays the fusion's strengths and weaknesses against different types. This is shown as multipliers like x2, x1, x0.5, or x0, helping you understand how the fusion will perform in battle.</p>
      </article>
    </>
  )
}