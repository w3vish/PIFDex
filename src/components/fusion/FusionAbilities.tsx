import React from 'react';
import { InfoToolTip } from "../sprites";
import { Abilities } from "@/lib/types/SpriteResponse";

// Define the type for the abilities prop
type FusionAbilitiesProps = {
  ability: {
    normalAbilities: Abilities[];
    hiddenAbilities: Abilities[];
  };
};

function FusionAbilities({ ability }: FusionAbilitiesProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4 text-base px-2">
      {/* Render normal abilities */}
      <div>
        <h3 className="font-semibold text-muted-foreground">Normal Abilities</h3>
        <div className="grid gap-1 text-sm md:text-base">
          {ability.normalAbilities.length > 0 ? (
            ability.normalAbilities.map((abl) => (
              <InfoToolTip
                key={abl.id}  // Use unique ability ID instead of index
                name={abl.real_name || "Unknown Ability"}
                content={abl.real_description || "No description available"}
              />
            ))
          ) : (
            <p>No normal abilities available.</p>
          )}
        </div>
      </div>

      {/* Render hidden abilities */}
      <div>
        <h3 className="font-semibold text-muted-foreground">Hidden Abilities</h3>
        <div className="grid gap-1 text-sm md:text-base">
          {ability.hiddenAbilities.length > 0 ? (
            ability.hiddenAbilities.map((abl) => (
              <InfoToolTip
                key={abl.id}  // Use unique ability ID instead of index
                name={abl.real_name || "Unknown Ability"}
                content={abl.real_description || "No description available"}
              />
            ))
          ) : (
            <p>No hidden abilities available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export { FusionAbilities };
