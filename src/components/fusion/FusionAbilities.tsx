import { abilities } from "@/lib/utils/constants";
import React from 'react';
import { InfoToolTip } from "../sprites";

interface Ability {
  normal: string[];
  hidden: string[];
}

function FusionAbilities({ ability }: { ability: Ability }) {
  return (
    <div className="grid md:grid-cols-2 gap-4 text-base px-2">
      {/* Render normal abilities */}
      <div className="">
        <h3 className="font-semibold text-muted-foreground">Normal Abilities</h3>
        <div className="grid gap-1 text-sm md:text-base">
          {ability?.normal.map((abl, ind) => (
            <InfoToolTip
              key={ind}
              name={abilities[abl]?.name || "Unknown Ability"}
              content={abilities[abl]?.description || "No description available"}
            />
          ))}
        </div>
      </div>

      {/* Render hidden abilities */}
      <div className="">
        <h3 className="font-semibold text-muted-foreground">Hidden Abilities</h3>
        <div className="grid gap-1 text-sm md:text-base">
          {ability?.hidden.map((abl, ind) => (
            <InfoToolTip
              key={ind}
              name={abilities[abl]?.name || "Unknown Ability"}
              content={abilities[abl]?.description || "No description available"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export { FusionAbilities };
