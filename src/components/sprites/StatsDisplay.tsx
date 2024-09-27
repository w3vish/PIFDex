import { Progress } from "@/components/ui/progress";
import { maxStats } from "@/lib/utils/constants";

type Stats = {
  HP: number;
  Attack: number;
  Defense: number;
  'Sp. Atk': number;
  'Sp. Def': number;
  Speed: number;
  Total: number;
};

type StatProgress = {
  HP: number;
  Attack: number;
  Defense: number;
  'Sp. Atk': number;
  'Sp. Def': number;
  Speed: number;
  Total: number;
};

interface StatsDisplayProps {
  stats: Stats;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats }) => {
  const statProgress: StatProgress = {
    HP: (stats.HP / maxStats.MaxHP) * 100,
    Attack: (stats.Attack / maxStats.MaxAttack) * 100,
    Defense: (stats.Defense / maxStats.MaxDefense) * 100,
    'Sp. Atk': (stats['Sp. Atk'] / maxStats.MaxSpAtk) * 100,
    'Sp. Def': (stats['Sp. Def'] / maxStats.MaxSpDef) * 100,
    Speed: (stats.Speed / maxStats.MaxSpeed) * 100,
    Total: (stats.Total / maxStats.MaxTotal) * 100,
  };

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
        {Object.keys(stats).map((statKey) => (
          <div
            key={statKey as keyof Stats}
            className={`${statKey === 'Total' ? 'col-span-full' : ''}`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="min-w-fit text-sm">{statKey}</span>
              <span className="text-sm">{stats[statKey as keyof Stats]}</span>
            </div>
            <Progress
              value={statProgress[statKey as keyof StatProgress]}
              className="w-full h-2 rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export { StatsDisplay };
