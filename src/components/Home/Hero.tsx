import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { gameInfo } from "@/lib/utils/constants"
import { Card } from "../ui/card"

export default function HeroSection() {
    const progressPercentage = (gameInfo.spritesWithCustomSprites / gameInfo.totalSprites) * 100

    return (
        <Card className="space-y-6 m-2 py-8 px-4">
           <div>
           <h1 className="text-3xl font-bold tracking-tight">Welcome to InfiniteFusion.org</h1>
            <p className="text-base md:text-lg text-muted-foreground">
                A Dex for the Pokémon Infinite Fusion game. Explore our vast collection of Pokémon fusions and custom sprites.
            </p>
           </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span>Total Pokemons: <span className="font-semibold">{gameInfo.totalSprites.toLocaleString()}</span></span>
                    <span className="text-end">Custom Sprites: <span className="font-semibold">{gameInfo.spritesWithCustomSprites.toLocaleString()}</span></span>
                </div>
                <Progress
                    value={progressPercentage}
                    className="w-full h-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{progressPercentage.toFixed(1)}% with custom sprites</span>
                    <span>{gameInfo.totalSprites.toLocaleString()} total sprites</span>
                </div>
            </div>

            <div className="flex items-center justify-between text-sm">
                <span>Contributing Artists: <span className="font-semibold">3,400+</span></span>
                <span className="text-end">Total Custom Sprites: <span className="font-semibold">170,000+</span></span>
            </div>

            <Separator className="bg-gray-700" />

            <p className="text-sm text-muted-foreground">
                New sprites are constantly being added by our vibrant community. <a href="https://discord.gg/infinitefusion" className="text-blue-500 underline">Join our Discord</a> to be part of the Infinite Fusion community!
            </p>

        </Card>
    )
}