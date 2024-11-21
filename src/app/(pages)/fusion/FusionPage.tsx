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

  // useEffect(() => {
  //   const data: any = {"results":[{"spriteType":"fusion","hasCustomSprite":true,"id":"250.275","name":"Ho-gon-Z","pokedex_entry":"The injection of a rogue program into a drawing assistant program gave it new life. It seeks to fill the gray parts of the world with color and life.","category":"Rainbow Virtual","base_pokemons":{"250":"Ho-Oh","275":"Porygon-Z"},"types":["FIRE","NORMAL"],"abilities":{"normalAbilities":[{"id":"PRESSURE","id_number":46,"real_name":"Pressure","real_description":"The Pokémon raises the foe's PP usage."},{"id":"ADAPTABILITY","id_number":91,"real_name":"Adaptability","real_description":"Powers up moves of the same type."},{"id":"DOWNLOAD","id_number":88,"real_name":"Download","real_description":"Adjusts power according to a foe's defenses."}],"hiddenAbilities":[{"id":"REGENERATOR","id_number":144,"real_name":"Regenerator","real_description":"Restores a little HP when withdrawn from battle."},{"id":"ANALYTIC","id_number":148,"real_name":"Analytic","real_description":"Boosts move power when the Pokémon moves last."}]},"stats":{"base_hp":99,"base_atk":96,"base_def":76,"base_sp_atk":118,"base_sp_def":127,"base_spd":90},"ev_stats":{"ev_hp":0,"ev_atk":0,"ev_def":0,"ev_sp_atk":1,"ev_sp_def":1,"ev_spd":0},"base_exp":273,"growth_rate":"Slow","gender_ratio":"Genderless","catch_rate":3,"happiness":0,"egg_groups":["Undiscovered","Mineral"],"hatch_steps":18105,"height":23,"weight":1165,"color":"Red","shape":"HeadArms","habitat":"Rare","back_sprite_x":0,"back_sprite_y":5,"front_sprite_x":0,"front_sprite_y":11,"front_sprite_a":8,"shadow_x":0,"shadow_size":1,"moves":[{"level":1,"id":"WHIRLWIND","id_number":515,"real_name":"Whirlwind","function_code":"0EB","base_damage":0,"type":"NORMAL","category":2,"accuracy":0,"total_pp":20,"effect_chance":0,"target":"NearOther","priority":-6,"flags":"ce","real_description":"The foe is blown away, to be replaced by another Pokémon in its party. In the wild, the battle ends."},{"level":1,"id":"WEATHERBALL","id_number":390,"real_name":"Weather Ball","function_code":"087","base_damage":50,"type":"NORMAL","category":1,"accuracy":100,"total_pp":10,"effect_chance":0,"target":"NearOther","priority":0,"flags":"befn","real_description":"An attack move that varies in power and type depending on the weather."},{"level":1,"id":"TRICKROOM","id_number":603,"real_name":"Trick Room","function_code":"11F","base_damage":0,"type":"PSYCHIC","category":2,"accuracy":0,"total_pp":5,"effect_chance":0,"target":"BothSides","priority":-7,"flags":"e","real_description":"The user creates a bizarre area in which slower Pokémon get to move first for five turns."},{"level":1,"id":"ZAPCANNON","id_number":83,"real_name":"Zap Cannon","function_code":"007","base_damage":120,"type":"ELECTRIC","category":1,"accuracy":50,"total_pp":5,"effect_chance":100,"target":"NearOther","priority":0,"flags":"befn","real_description":"The user fires an electric blast like a cannon to inflict damage and cause paralysis."},{"level":1,"id":"MAGICCOAT","id_number":586,"real_name":"Magic Coat","function_code":"0B1","base_damage":0,"type":"PSYCHIC","category":2,"accuracy":0,"total_pp":15,"effect_chance":0,"target":"User","priority":4,"flags":"","real_description":"A barrier reflects back to the target moves like Leech Seed and moves that damage status."},{"level":1,"id":"CONVERSION2","id_number":442,"real_name":"Conversion 2","function_code":"05F","base_damage":0,"type":"NORMAL","category":2,"accuracy":0,"total_pp":30,"effect_chance":0,"target":"NearOther","priority":0,"flags":"","real_description":"The user changes its type to make itself resistant to the type of the attack the opponent used last."},{"level":1,"id":"TACKLE","id_number":399,"real_name":"Tackle","function_code":"000","base_damage":40,"type":"NORMAL","category":0,"accuracy":100,"total_pp":35,"effect_chance":0,"target":"NearOther","priority":0,"flags":"abef","real_description":"A physical attack in which the user charges and slams into the target with its whole body."},{"level":1,"id":"CONVERSION","id_number":441,"real_name":"Conversion","function_code":"05E","base_damage":0,"type":"NORMAL","category":2,"accuracy":0,"total_pp":30,"effect_chance":0,"target":"User","priority":0,"flags":"d","real_description":"The user changes its type to become the same type as one of its moves."},{"level":1,"id":"NASTYPLOT","id_number":57,"real_name":"Nasty Plot","function_code":"032","base_damage":0,"type":"DARK","category":2,"accuracy":0,"total_pp":20,"effect_chance":0,"target":"User","priority":0,"flags":"d","real_description":"The user stimulates its brain by thinking bad thoughts. It sharply raises the user's Sp. Atk."},{"level":7,"id":"PSYBEAM","id_number":561,"real_name":"Psybeam","function_code":"013","base_damage":65,"type":"PSYCHIC","category":1,"accuracy":100,"total_pp":20,"effect_chance":10,"target":"NearOther","priority":0,"flags":"bef","real_description":"The target is attacked with a peculiar ray. It may also cause confusion."},{"level":9,"id":"GUST","id_number":224,"real_name":"Gust","function_code":"077","base_damage":40,"type":"FLYING","category":1,"accuracy":100,"total_pp":35,"effect_chance":0,"target":"Other","priority":0,"flags":"bef","real_description":"A gust of wind is whipped up by wings and launched at the target to inflict damage."},{"level":12,"id":"AGILITY","id_number":567,"real_name":"Agility","function_code":"030","base_damage":0,"type":"PSYCHIC","category":2,"accuracy":0,"total_pp":30,"effect_chance":0,"target":"User","priority":0,"flags":"d","real_description":"The user relaxes and lightens its body to move faster. It sharply boosts the Speed stat."},{"level":15,"id":"BRAVEBIRD","id_number":207,"real_name":"Brave Bird","function_code":"0FB","base_damage":120,"type":"FLYING","category":0,"accuracy":100,"total_pp":15,"effect_chance":0,"target":"Other","priority":0,"flags":"abef","real_description":"The user tucks in its wings and charges from a low altitude. The user also takes serious damage."},{"level":18,"id":"RECOVER","id_number":484,"real_name":"Recover","function_code":"0D5","base_damage":0,"type":"NORMAL","category":2,"accuracy":0,"total_pp":10,"effect_chance":0,"target":"User","priority":0,"flags":"d","real_description":"Restoring its own cells, the user restores its own HP by half of its max HP."},{"level":23,"id":"EXTRASENSORY","id_number":554,"real_name":"Extrasensory","function_code":"00F","base_damage":80,"type":"PSYCHIC","category":1,"accuracy":100,"total_pp":20,"effect_chance":10,"target":"NearOther","priority":0,"flags":"be","real_description":"The user attacks with an odd, unseeable power. It may also make the target flinch."},{"level":23,"id":"MAGNETRISE","id_number":107,"real_name":"Magnet Rise","function_code":"119","base_damage":0,"type":"ELECTRIC","category":2,"accuracy":0,"total_pp":10,"effect_chance":0,"target":"User","priority":0,"flags":"d","real_description":"The user levitates using electrically generated magnetism for five turns."},{"level":29,"id":"SUNNYDAY","id_number":204,"real_name":"Sunny Day","function_code":"0FF","base_damage":0,"type":"FIRE","category":2,"accuracy":0,"total_pp":5,"effect_chance":0,"target":"BothSides","priority":0,"flags":"","real_description":"The user intensifies the sun for five turns, powering up Fire-type moves."},{"level":29,"id":"SIGNALBEAM","id_number":9,"real_name":"Signal Beam","function_code":"013","base_damage":75,"type":"BUG","category":1,"accuracy":100,"total_pp":15,"effect_chance":10,"target":"NearOther","priority":0,"flags":"bef","real_description":"The user attacks with a sinister beam of light. It may also confuse the target."},{"level":34,"id":"EMBARGO","id_number":52,"real_name":"Embargo","function_code":"0F8","base_damage":0,"type":"DARK","category":2,"accuracy":100,"total_pp":15,"effect_chance":0,"target":"NearOther","priority":0,"flags":"bce","real_description":"It prevents the target from using its held item. Its Trainer is also prevented from using items on it."},{"level":37,"id":"FIREBLAST","id_number":181,"real_name":"Fire Blast","function_code":"00A","base_damage":110,"type":"FIRE","category":1,"accuracy":85,"total_pp":5,"effect_chance":10,"target":"NearOther","priority":0,"flags":"bef","real_description":"The foe is attacked with an intense blast of all-consuming fire. It may also leave the target with a burn."},{"level":40,"id":"DISCHARGE","id_number":89,"real_name":"Discharge","function_code":"007","base_damage":80,"type":"ELECTRIC","category":1,"accuracy":100,"total_pp":15,"effect_chance":30,"target":"AllNearOthers","priority":0,"flags":"bef","real_description":"A flare of electricity is loosed to strike the area around the user. It may also cause paralysis."},{"level":43,"id":"SACREDFIRE","id_number":185,"real_name":"Sacred Fire","function_code":"00A","base_damage":100,"type":"FIRE","category":0,"accuracy":95,"total_pp":5,"effect_chance":50,"target":"NearOther","priority":0,"flags":"befg","real_description":"The target is razed with a mystical fire of great intensity. It may also leave the target with a burn."},{"level":45,"id":"LOCKON","id_number":465,"real_name":"Lock-On","function_code":"0A6","base_damage":0,"type":"NORMAL","category":2,"accuracy":0,"total_pp":5,"effect_chance":0,"target":"NearOther","priority":0,"flags":"be","real_description":"The user takes sure aim at the target. It ensures the next attack does not fail to hit the target."},{"level":50,"id":"PUNISHMENT","id_number":50,"real_name":"Punishment","function_code":"08F","base_damage":1,"type":"DARK","category":0,"accuracy":100,"total_pp":5,"effect_chance":0,"target":"NearOther","priority":0,"flags":"abef","real_description":"This attack's power increases the more the target has powered up with stat changes."},{"level":50,"id":"TRIATTACK","id_number":369,"real_name":"Tri Attack","function_code":"017","base_damage":80,"type":"NORMAL","category":1,"accuracy":100,"total_pp":10,"effect_chance":20,"target":"NearOther","priority":0,"flags":"bef","real_description":"The user strikes with a simultaneous three-beam attack. May also paralyze, burn, or freeze the target."},{"level":57,"id":"ANCIENTPOWER","id_number":611,"real_name":"Ancient Power","function_code":"02D","base_damage":60,"type":"ROCK","category":1,"accuracy":100,"total_pp":5,"effect_chance":10,"target":"NearOther","priority":0,"flags":"bef","real_description":"The user attacks with a prehistoric power. It may also raise all the user's stats at once."},{"level":65,"id":"SAFEGUARD","id_number":489,"real_name":"Safeguard","function_code":"01A","base_damage":0,"type":"NORMAL","category":2,"accuracy":0,"total_pp":25,"effect_chance":0,"target":"UserSide","priority":0,"flags":"d","real_description":"The user creates a protective field that prevents status problems for five turns."},{"level":67,"id":"HYPERBEAM","id_number":345,"real_name":"Hyper Beam","function_code":"0C2","base_damage":150,"type":"NORMAL","category":1,"accuracy":90,"total_pp":5,"effect_chance":0,"target":"NearOther","priority":0,"flags":"bef","real_description":"The foe is attacked with a powerful beam. The user must rest on the next turn to regain its energy."},{"level":79,"id":"FUTURESIGHT","id_number":547,"real_name":"Future Sight","function_code":"111","base_damage":120,"type":"PSYCHIC","category":1,"accuracy":100,"total_pp":10,"effect_chance":0,"target":"NearOther","priority":0,"flags":"","real_description":"Two turns after this move is used, a hunk of psychic energy attacks the target."},{"level":85,"id":"NATURALGIFT","id_number":421,"real_name":"Natural Gift","function_code":"096","base_damage":1,"type":"NORMAL","category":0,"accuracy":100,"total_pp":15,"effect_chance":0,"target":"NearOther","priority":0,"flags":"bef","real_description":"The user draws power to attack by using its held Berry. The Berry determines its type and power."},{"level":93,"id":"CALMMIND","id_number":571,"real_name":"Calm Mind","function_code":"02C","base_damage":0,"type":"PSYCHIC","category":2,"accuracy":0,"total_pp":20,"effect_chance":0,"target":"User","priority":0,"flags":"d","real_description":"The user quietly focuses its mind and calms its spirit to raise its Sp. Atk and Sp. Def stats."},{"level":99,"id":"SKYATTACK","id_number":206,"real_name":"Sky Attack","function_code":"0C7","base_damage":140,"type":"FLYING","category":0,"accuracy":90,"total_pp":5,"effect_chance":30,"target":"Other","priority":0,"flags":"beh","real_description":"A second-turn attack move where critical hits land more easily. It may also make the target flinch."}],"tutor_moves":["AERIALACE","BULLDOZE","CALMMIND","CHARGEBEAM","CONFIDE","DEFOG","DOUBLETEAM","DREAMEATER","EARTHPOWER","EARTHQUAKE","ECHOEDVOICE","FACADE","FIREBLAST","FLAMECHARGE","FLAMETHROWER","FLY","FRUSTRATION","GIGADRAIN","GIGAIMPACT","HEATWAVE","HIDDENPOWER","HYPERBEAM","HYPERVOICE","IRONHEAD","LASERFOCUS","LIGHTSCREEN","OVERHEAT","PROTECT","PSYCHIC","PSYCHUP","RAINDANCE","REFLECT","REST","RETURN","ROAR","ROCKSMASH","ROOST","ROUND","SAFEGUARD","SANDSTORM","SHADOWBALL","SHOCKWAVE","SIGNALBEAM","SKYATTACK","SKYDROP","SLEEPTALK","SNORE","SOLARBEAM","STEELWING","STRENGTH","SUBSTITUTE","SUNNYDAY","SWAGGER","TAILWIND","THUNDER","THUNDERBOLT","THUNDERWAVE","TOXIC","WILLOWISP","ZENHEADBUTT","INCINERATE","FLASH","PLUCK","AIRCUTTER","ANCIENTPOWER","MUDSLAP","OMINOUSWIND","SWIFT","TWISTER","TELEPORT","RECOVER","MORNINGSUN","ALLYSWITCH","BLIZZARD","DARKPULSE","ELECTROWEB","EMBARGO","FOULPLAY","GRAVITY","ICEBEAM","ICYWIND","IRONTAIL","LASTRESORT","MAGICCOAT","MAGNETRISE","PAINSPLIT","PSYSHOCK","RECYCLE","TELEKINESIS","THIEF","TRICK","TRICKROOM","UPROAR","NASTYPLOT"],"egg_moves":[],"evolvesFrom":[{"target":"250.275","method":"Item","param":"DUBIOUSDISC","from":"233.275","to":"250.275","name":"Ho-gon-Z"}],"evolvesTo":[],"images":[{"sprite_id":"250.275","sprite_type":"main","base_id":"250.275","creation_date":"2024-11-01T00:26:36.289Z","last_update_date":"2024-04-02T03:30:42.284Z","artists":["soreile.arc"],"comments":null}]},{"spriteType":"fusion","hasCustomSprite":true,"id":"275.250","name":"Poryoh","pokedex_entry":"Additional software was installed to make it a better Pokémon. It is said to live at the foot of a rainbow.","category":"Virtual Rainbow","base_pokemons":{"250":"Ho-Oh","275":"Porygon-Z"},"types":["NORMAL","FLYING"],"abilities":{"normalAbilities":[{"id":"ADAPTABILITY","id_number":91,"real_name":"Adaptability","real_description":"Powers up moves of the same type."},{"id":"DOWNLOAD","id_number":88,"real_name":"Download","real_description":"Adjusts power according to a foe's defenses."},{"id":"PRESSURE","id_number":46,"real_name":"Pressure","real_description":"The Pokémon raises the foe's PP usage."}],"hiddenAbilities":[{"id":"ANALYTIC","id_number":148,"real_name":"Analytic","real_description":"Boosts move power when the Pokémon moves last."},{"id":"REGENERATOR","id_number":144,"real_name":"Regenerator","real_description":"Restores a little HP when withdrawn from battle."}]},"stats":{"base_hp":92,"base_atk":113,"base_def":83,"base_sp_atk":126,"base_sp_def":101,"base_spd":90},"ev_stats":{"ev_hp":0,"ev_atk":0,"ev_def":0,"ev_sp_atk":1,"ev_sp_def":1,"ev_spd":0},"base_exp":273,"growth_rate":"Slow","gender_ratio":"Genderless","catch_rate":3,"happiness":70,"egg_groups":["Mineral","Undiscovered"],"hatch_steps":18105,"height":23,"weight":1165,"color":"Red","shape":"Winged","habitat":"Rare","back_sprite_x":0,"back_sprite_y":228,"front_sprite_x":0,"front_sprite_y":6,"front_sprite_a":18,"shadow_x":0,"shadow_size":5,"moves":[{"level":1,"id":"TRICKROOM","id_number":603,"real_name":"Trick Room","function_code":"11F","base_damage":0,"type":"PSYCHIC","category":2,"accuracy":0,"total_pp":5,"effect_chance":0,"target":"BothSides","priority":-7,"flags":"e","real_description":"The user creates a bizarre area in which slower Pokémon get to move first for five turns."},{"level":1,"id":"ZAPCANNON","id_number":83,"real_name":"Zap Cannon","function_code":"007","base_damage":120,"type":"ELECTRIC","category":1,"accuracy":50,"total_pp":5,"effect_chance":100,"target":"NearOther","priority":0,"flags":"befn","real_description":"The user fires an electric blast like a cannon to inflict damage and cause paralysis."},{"level":1,"id":"MAGICCOAT","id_number":586,"real_name":"Magic Coat","function_code":"0B1","base_damage":0,"type":"PSYCHIC","category":2,"accuracy":0,"total_pp":15,"effect_chance":0,"target":"User","priority":4,"flags":"","real_description":"A barrier reflects back to the target moves like Leech Seed and moves that damage status."},{"level":1,"id":"CONVERSION2","id_number":442,"real_name":"Conversion 2","function_code":"05F","base_damage":0,"type":"NORMAL","category":2,"accuracy":0,"total_pp":30,"effect_chance":0,"target":"NearOther","priority":0,"flags":"","real_description":"The user changes its type to make itself resistant to the type of the attack the opponent used last."},{"level":1,"id":"TACKLE","id_number":399,"real_name":"Tackle","function_code":"000","base_damage":40,"type":"NORMAL","category":0,"accuracy":100,"total_pp":35,"effect_chance":0,"target":"NearOther","priority":0,"flags":"abef","real_description":"A physical attack in which the user charges and slams into the target with its whole body."},{"level":1,"id":"CONVERSION","id_number":441,"real_name":"Conversion","function_code":"05E","base_damage":0,"type":"NORMAL","category":2,"accuracy":0,"total_pp":30,"effect_chance":0,"target":"User","priority":0,"flags":"d","real_description":"The user changes its type to become the same type as one of its moves."},{"level":1,"id":"NASTYPLOT","id_number":57,"real_name":"Nasty Plot","function_code":"032","base_damage":0,"type":"DARK","category":2,"accuracy":0,"total_pp":20,"effect_chance":0,"target":"User","priority":0,"flags":"d","real_description":"The user stimulates its brain by thinking bad thoughts. It sharply raises the user's Sp. Atk."},{"level":1,"id":"WHIRLWIND","id_number":515,"real_name":"Whirlwind","function_code":"0EB","base_damage":0,"type":"NORMAL","category":2,"accuracy":0,"total_pp":20,"effect_chance":0,"target":"NearOther","priority":-6,"flags":"ce","real_description":"The foe is blown away, to be replaced by another Pokémon in its party. In the wild, the battle ends."},{"level":1,"id":"WEATHERBALL","id_number":390,"real_name":"Weather Ball","function_code":"087","base_damage":50,"type":"NORMAL","category":1,"accuracy":100,"total_pp":10,"effect_chance":0,"target":"NearOther","priority":0,"flags":"befn","real_description":"An attack move that varies in power and type depending on the weather."},{"level":7,"id":"PSYBEAM","id_number":561,"real_name":"Psybeam","function_code":"013","base_damage":65,"type":"PSYCHIC","category":1,"accuracy":100,"total_pp":20,"effect_chance":10,"target":"NearOther","priority":0,"flags":"bef","real_description":"The target is attacked with a peculiar ray. It may also cause confusion."},{"level":9,"id":"GUST","id_number":224,"real_name":"Gust","function_code":"077","base_damage":40,"type":"FLYING","category":1,"accuracy":100,"total_pp":35,"effect_chance":0,"target":"Other","priority":0,"flags":"bef","real_description":"A gust of wind is whipped up by wings and launched at the target to inflict damage."},{"level":12,"id":"AGILITY","id_number":567,"real_name":"Agility","function_code":"030","base_damage":0,"type":"PSYCHIC","category":2,"accuracy":0,"total_pp":30,"effect_chance":0,"target":"User","priority":0,"flags":"d","real_description":"The user relaxes and lightens its body to move faster. It sharply boosts the Speed stat."},{"level":15,"id":"BRAVEBIRD","id_number":207,"real_name":"Brave Bird","function_code":"0FB","base_damage":120,"type":"FLYING","category":0,"accuracy":100,"total_pp":15,"effect_chance":0,"target":"Other","priority":0,"flags":"abef","real_description":"The user tucks in its wings and charges from a low altitude. The user also takes serious damage."},{"level":18,"id":"RECOVER","id_number":484,"real_name":"Recover","function_code":"0D5","base_damage":0,"type":"NORMAL","category":2,"accuracy":0,"total_pp":10,"effect_chance":0,"target":"User","priority":0,"flags":"d","real_description":"Restoring its own cells, the user restores its own HP by half of its max HP."},{"level":23,"id":"MAGNETRISE","id_number":107,"real_name":"Magnet Rise","function_code":"119","base_damage":0,"type":"ELECTRIC","category":2,"accuracy":0,"total_pp":10,"effect_chance":0,"target":"User","priority":0,"flags":"d","real_description":"The user levitates using electrically generated magnetism for five turns."},{"level":23,"id":"EXTRASENSORY","id_number":554,"real_name":"Extrasensory","function_code":"00F","base_damage":80,"type":"PSYCHIC","category":1,"accuracy":100,"total_pp":20,"effect_chance":10,"target":"NearOther","priority":0,"flags":"be","real_description":"The user attacks with an odd, unseeable power. It may also make the target flinch."},{"level":29,"id":"SIGNALBEAM","id_number":9,"real_name":"Signal Beam","function_code":"013","base_damage":75,"type":"BUG","category":1,"accuracy":100,"total_pp":15,"effect_chance":10,"target":"NearOther","priority":0,"flags":"bef","real_description":"The user attacks with a sinister beam of light. It may also confuse the target."},{"level":29,"id":"SUNNYDAY","id_number":204,"real_name":"Sunny Day","function_code":"0FF","base_damage":0,"type":"FIRE","category":2,"accuracy":0,"total_pp":5,"effect_chance":0,"target":"BothSides","priority":0,"flags":"","real_description":"The user intensifies the sun for five turns, powering up Fire-type moves."},{"level":34,"id":"EMBARGO","id_number":52,"real_name":"Embargo","function_code":"0F8","base_damage":0,"type":"DARK","category":2,"accuracy":100,"total_pp":15,"effect_chance":0,"target":"NearOther","priority":0,"flags":"bce","real_description":"It prevents the target from using its held item. Its Trainer is also prevented from using items on it."},{"level":37,"id":"FIREBLAST","id_number":181,"real_name":"Fire Blast","function_code":"00A","base_damage":110,"type":"FIRE","category":1,"accuracy":85,"total_pp":5,"effect_chance":10,"target":"NearOther","priority":0,"flags":"bef","real_description":"The foe is attacked with an intense blast of all-consuming fire. It may also leave the target with a burn."},{"level":40,"id":"DISCHARGE","id_number":89,"real_name":"Discharge","function_code":"007","base_damage":80,"type":"ELECTRIC","category":1,"accuracy":100,"total_pp":15,"effect_chance":30,"target":"AllNearOthers","priority":0,"flags":"bef","real_description":"A flare of electricity is loosed to strike the area around the user. It may also cause paralysis."},{"level":43,"id":"SACREDFIRE","id_number":185,"real_name":"Sacred Fire","function_code":"00A","base_damage":100,"type":"FIRE","category":0,"accuracy":95,"total_pp":5,"effect_chance":50,"target":"NearOther","priority":0,"flags":"befg","real_description":"The target is razed with a mystical fire of great intensity. It may also leave the target with a burn."},{"level":45,"id":"LOCKON","id_number":465,"real_name":"Lock-On","function_code":"0A6","base_damage":0,"type":"NORMAL","category":2,"accuracy":0,"total_pp":5,"effect_chance":0,"target":"NearOther","priority":0,"flags":"be","real_description":"The user takes sure aim at the target. It ensures the next attack does not fail to hit the target."},{"level":50,"id":"TRIATTACK","id_number":369,"real_name":"Tri Attack","function_code":"017","base_damage":80,"type":"NORMAL","category":1,"accuracy":100,"total_pp":10,"effect_chance":20,"target":"NearOther","priority":0,"flags":"bef","real_description":"The user strikes with a simultaneous three-beam attack. May also paralyze, burn, or freeze the target."},{"level":50,"id":"PUNISHMENT","id_number":50,"real_name":"Punishment","function_code":"08F","base_damage":1,"type":"DARK","category":0,"accuracy":100,"total_pp":5,"effect_chance":0,"target":"NearOther","priority":0,"flags":"abef","real_description":"This attack's power increases the more the target has powered up with stat changes."},{"level":57,"id":"ANCIENTPOWER","id_number":611,"real_name":"Ancient Power","function_code":"02D","base_damage":60,"type":"ROCK","category":1,"accuracy":100,"total_pp":5,"effect_chance":10,"target":"NearOther","priority":0,"flags":"bef","real_description":"The user attacks with a prehistoric power. It may also raise all the user's stats at once."},{"level":65,"id":"SAFEGUARD","id_number":489,"real_name":"Safeguard","function_code":"01A","base_damage":0,"type":"NORMAL","category":2,"accuracy":0,"total_pp":25,"effect_chance":0,"target":"UserSide","priority":0,"flags":"d","real_description":"The user creates a protective field that prevents status problems for five turns."},{"level":67,"id":"HYPERBEAM","id_number":345,"real_name":"Hyper Beam","function_code":"0C2","base_damage":150,"type":"NORMAL","category":1,"accuracy":90,"total_pp":5,"effect_chance":0,"target":"NearOther","priority":0,"flags":"bef","real_description":"The foe is attacked with a powerful beam. The user must rest on the next turn to regain its energy."},{"level":79,"id":"FUTURESIGHT","id_number":547,"real_name":"Future Sight","function_code":"111","base_damage":120,"type":"PSYCHIC","category":1,"accuracy":100,"total_pp":10,"effect_chance":0,"target":"NearOther","priority":0,"flags":"","real_description":"Two turns after this move is used, a hunk of psychic energy attacks the target."},{"level":85,"id":"NATURALGIFT","id_number":421,"real_name":"Natural Gift","function_code":"096","base_damage":1,"type":"NORMAL","category":0,"accuracy":100,"total_pp":15,"effect_chance":0,"target":"NearOther","priority":0,"flags":"bef","real_description":"The user draws power to attack by using its held Berry. The Berry determines its type and power."},{"level":93,"id":"CALMMIND","id_number":571,"real_name":"Calm Mind","function_code":"02C","base_damage":0,"type":"PSYCHIC","category":2,"accuracy":0,"total_pp":20,"effect_chance":0,"target":"User","priority":0,"flags":"d","real_description":"The user quietly focuses its mind and calms its spirit to raise its Sp. Atk and Sp. Def stats."},{"level":99,"id":"SKYATTACK","id_number":206,"real_name":"Sky Attack","function_code":"0C7","base_damage":140,"type":"FLYING","category":0,"accuracy":90,"total_pp":5,"effect_chance":30,"target":"Other","priority":0,"flags":"beh","real_description":"A second-turn attack move where critical hits land more easily. It may also make the target flinch."}],"tutor_moves":["AERIALACE","ALLYSWITCH","BLIZZARD","CHARGEBEAM","CONFIDE","DARKPULSE","DOUBLETEAM","DREAMEATER","ELECTROWEB","EMBARGO","FACADE","FOULPLAY","FRUSTRATION","GIGAIMPACT","GRAVITY","HIDDENPOWER","HYPERBEAM","ICEBEAM","ICYWIND","IRONTAIL","LASTRESORT","MAGICCOAT","MAGNETRISE","PAINSPLIT","PROTECT","PSYCHIC","PSYCHUP","PSYSHOCK","RAINDANCE","RECYCLE","REST","RETURN","ROUND","SHADOWBALL","SHOCKWAVE","SIGNALBEAM","SLEEPTALK","SNORE","SOLARBEAM","SUBSTITUTE","SUNNYDAY","SWAGGER","TELEKINESIS","THIEF","THUNDER","THUNDERBOLT","THUNDERWAVE","TOXIC","TRICK","TRICKROOM","UPROAR","ZENHEADBUTT","FLASH","SWIFT","TELEPORT","NASTYPLOT","RECOVER","BULLDOZE","CALMMIND","DEFOG","EARTHPOWER","EARTHQUAKE","ECHOEDVOICE","FIREBLAST","FLAMECHARGE","FLAMETHROWER","FLY","GIGADRAIN","HEATWAVE","HYPERVOICE","IRONHEAD","LASERFOCUS","LIGHTSCREEN","OVERHEAT","REFLECT","ROAR","ROCKSMASH","ROOST","SAFEGUARD","SANDSTORM","SKYATTACK","SKYDROP","STEELWING","STRENGTH","TAILWIND","WILLOWISP","INCINERATE","PLUCK","AIRCUTTER","ANCIENTPOWER","MUDSLAP","OMINOUSWIND","TWISTER","MORNINGSUN"],"egg_moves":[],"evolvesFrom":[{"target":"275.250","method":"Item","param":"DUBIOUSDISC","from":"233.250","to":"275.250","name":"Poryoh"}],"evolvesTo":[],"images":[{"sprite_id":"275.250","sprite_type":"main","base_id":"275.250","creation_date":"2024-11-01T00:26:54.286Z","last_update_date":"2024-04-02T03:30:43.521Z","artists":["queeeeeeeenn"],"comments":null},{"sprite_id":"275.250a","sprite_type":"alt","base_id":"275.250","creation_date":"2024-11-01T00:26:54.287Z","last_update_date":"2024-04-02T03:30:43.521Z","artists":["cayde__"],"comments":null}]}]} 
  //   // Update fusion data
  //   const currentHeadId = "275"
  //   const currentBodyId = "250"

  //   setFusionData(data.results)
  //   const fusionId = `${currentHeadId}.${currentBodyId}`
  //   const reverseId = `${currentBodyId}.${currentHeadId}`
  //   const head = data.results.find((item: any) => item.id === fusionId)
  //   const body = data.results.find((item: any) => item.id === reverseId)

  //   setHeadData(head || null)
  //   setBodyData(body || null)

  //   // Update fused Pokemon state
  //   setFusedHeadPokemon({ id: currentHeadId, name: basePokemons[currentHeadId] })
  //   setFusedBodyPokemon({ id: currentBodyId, name: basePokemons[currentBodyId] })

  //   setFusionStatus('success')
  // }, [])

  useEffect(() => {
    randomFusion()
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