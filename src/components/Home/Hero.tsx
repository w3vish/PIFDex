import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { Card } from "../ui/card"
import { Calculator, Database, Users } from "lucide-react"
import { gameInfo } from "@/lib/utils/constants"

export default function HeroSection() {
    return (
        <div className="m-2">
            <Card className="p-4 md:p-6 space-y-8">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-2xl md:text-3xl font-bold">Welcome to InfiniteFusion.org</h1>
                    <p className="text-muted-foreground">
                        Your ultimate resource for Pokémon Infinite Fusion. Create unique combinations,
                        explore our vast sprite collection, and discover the artists behind the designs.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                    <Card className="p-4 border">
                        <Link href="/fusion" className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Calculator className="h-5 w-5 shrink-0" />
                                <h2 className="font-semibold">Fusion Calculator</h2>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Mix and match over {gameInfo.totalPokemons} Pokémon to create more than {gameInfo.totalSprites} unique fusions
                            </p>
                        </Link>
                    </Card>

                    <Card className="p-4 border">
                        <Link href="/dex" className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Database className="h-5 w-5 shrink-0" />
                                <h2 className="font-semibold">Fusion Pokédex</h2>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Browse through 2,21,390 sprite combinations, including 1,18,834 custom designs
                            </p>
                        </Link>
                    </Card>

                    <Card className="p-4 border">
                        <Link href="/artists" className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 shrink-0" />
                                <h2 className="font-semibold">Artist Gallery</h2>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Discover works from our community of {gameInfo.totalArtists.toLocaleString()}+ contributing artists
                            </p>
                        </Link>
                    </Card>
                </div>

                {/* Progress Section */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <div>Custom Sprites: <span className="font-semibold">1,18,834</span></div>
                        <div className="text-end justify-end items-end">Total Sprites: <span className="font-semibold ">2,21,390</span></div>
                    </div>
                    <Progress value={53.7} className="w-full h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <div>53.7% with custom sprites</div>
                        <div>2,21,390 total sprites</div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-2 border-t">
                    <p className="text-sm text-muted-foreground font-bold">
                        This site is a reimagined version of the original FusionDex (<a target="_blank" rel="nofollow" className="underline" href="https://fusiondex.org">fusiondex.org</a>).
                    </p>
                    <Link
                        href="/about"
                        className="text-sm text-primary hover:underline whitespace-nowrap flex items-center"
                    >
                        Learn more about the project →
                    </Link>
                </div>

            </Card>
        </div>
    )
}