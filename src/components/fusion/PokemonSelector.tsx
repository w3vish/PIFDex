import { basePokemons } from "@/lib/utils/constants"
import { Label } from "../ui/label"
import { SelectPokemon } from "./SelectPokemon"

interface SelectedPokemon {
  id: string
  name: string
}

interface PokemonSelectorProps {
  label: string
  selectedPokemon: SelectedPokemon | null
  onSelect: (id: string, name: string) => void
}

export function PokemonSelector({ label, selectedPokemon, onSelect }: PokemonSelectorProps) {
  return (
    <div>
      <Label className='ml-2 w-full'>{label}</Label>
      <SelectPokemon
        selectedPokemon={selectedPokemon}
        onSelect={onSelect}
        pokemons={basePokemons}
      />
    </div>
  )
}