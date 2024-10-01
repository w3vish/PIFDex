// components/FusionStats.tsx
import { Progress } from "@/components/ui/progress";
import { gameInfo } from "@/lib/utils/constants";

interface FusionStatsProps {
    headSpriteCount: number;
    bodySpriteCount: number;
}

const TotalFusionStats: React.FC<FusionStatsProps> = ({ headSpriteCount, bodySpriteCount }) => {
    return (
        <div className="mt-2 md:pr-4">
            <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                    <span className="min-w-fit text-sm">Fusions as Head</span>
                    <span className="text-sm">{headSpriteCount} / {gameInfo.totalPokemons}</span>
                </div>
                <Progress
                    value={headSpriteCount / gameInfo.totalPokemons * 100}
                    className="w-full h-2 rounded"
                />
            </div>
            <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                    <span className="min-w-fit text-sm">Fusions as Body</span>
                    <span className="text-sm">{bodySpriteCount} / {gameInfo.totalPokemons}</span>
                </div>
                <Progress
                    value={bodySpriteCount / gameInfo.totalPokemons * 100}
                    className="w-full h-2 rounded"
                />
            </div>
        </div>
    );
};

export { TotalFusionStats };
