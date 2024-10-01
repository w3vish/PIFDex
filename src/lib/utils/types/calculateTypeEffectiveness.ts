/** Type data for Pokémon types */
const TYPE_DATA: { [key: string]: { weaknesses?: string[], resistances?: string[], immunities?: string[] } } = {
    NORMAL: { weaknesses: ['FIGHTING'], immunities: ['GHOST'] },
    FIRE: {
        weaknesses: ['WATER', 'GROUND', 'ROCK'],
        resistances: ['FIRE', 'GRASS', 'ICE', 'BUG', 'STEEL', 'FAIRY']
    },
    WATER: {
        weaknesses: ['ELECTRIC', 'GRASS'],
        resistances: ['FIRE', 'WATER', 'ICE', 'STEEL']
    },
    ELECTRIC: {
        weaknesses: ['GROUND'],
        resistances: ['ELECTRIC', 'FLYING', 'STEEL']
    },
    GRASS: {
        weaknesses: ['FIRE', 'ICE', 'POISON', 'FLYING', 'BUG'],
        resistances: ['WATER', 'ELECTRIC', 'GRASS', 'GROUND']
    },
    ICE: {
        weaknesses: ['FIRE', 'FIGHTING', 'ROCK', 'STEEL'],
        resistances: ['ICE']
    },
    FIGHTING: {
        weaknesses: ['FLYING', 'PSYCHIC', 'FAIRY'],
        resistances: ['BUG', 'ROCK', 'DARK']
    },
    POISON: {
        weaknesses: ['GROUND', 'PSYCHIC'],
        resistances: ['FIGHTING', 'POISON', 'BUG', 'GRASS', 'FAIRY']
    },
    GROUND: {
        weaknesses: ['WATER', 'GRASS', 'ICE'],
        resistances: ['POISON', 'ROCK'],
        immunities: ['ELECTRIC']
    },
    FLYING: {
        weaknesses: ['ELECTRIC', 'ICE', 'ROCK'],
        resistances: ['FIGHTING', 'BUG', 'GRASS'],
        immunities: ['GROUND']
    },
    PSYCHIC: {
        weaknesses: ['BUG', 'GHOST', 'DARK'],
        resistances: ['FIGHTING', 'PSYCHIC']
    },
    BUG: {
        weaknesses: ['FLYING', 'ROCK', 'FIRE'],
        resistances: ['FIGHTING', 'GROUND', 'GRASS']
    },
    ROCK: {
        weaknesses: ['WATER', 'GRASS', 'FIGHTING', 'GROUND', 'STEEL'],
        resistances: ['NORMAL', 'FLYING', 'POISON', 'FIRE']
    },
    GHOST: {
        weaknesses: ['GHOST', 'DARK'],
        resistances: ['POISON', 'BUG'],
        immunities: ['NORMAL', 'FIGHTING']
    },
    DRAGON: {
        weaknesses: ['ICE', 'DRAGON', 'FAIRY'],
        resistances: ['FIRE', 'WATER', 'GRASS', 'ELECTRIC']
    },
    DARK: {
        weaknesses: ['FIGHTING', 'BUG', 'FAIRY'],
        resistances: ['GHOST', 'DARK'],
        immunities: ['PSYCHIC']
    },
    STEEL: {
        weaknesses: ['FIRE', 'FIGHTING', 'GROUND'],
        resistances: ['NORMAL', 'FLYING', 'ROCK', 'BUG', 'STEEL', 'GRASS', 'PSYCHIC', 'ICE', 'DRAGON', 'FAIRY'],
        immunities: ['POISON']
    },
    FAIRY: {
        weaknesses: ['POISON', 'STEEL'],
        resistances: ['FIGHTING', 'BUG', 'DARK'],
        immunities: ['DRAGON']
    }
};

/**
 * Calculate the effectiveness of attack types against a set of defending types.
 * @param types - Array of defending types.
 * @returns An object mapping effectiveness multipliers to lists of attacking types.
 * @throws Error if the input is not a valid array of types.
 */
function calculateTypeEffectiveness(types: string[], remove_empty_arrays = true): { [key: string]: string[] } {
    if (!Array.isArray(types) || types.length === 0 || types.length > 4) {
        throw new Error("Input must be an array of 1 to 4 types.");
    }

    const effectiveness: { [key: string]: string[] } = {
        'x4': [],
        'x2': [],
        'x1': [],
        'x0.5': [],
        'x0.25': [],
        'x0': []
    };

    const allTypes = Object.keys(TYPE_DATA);
    const typeSet = new Set(types.map(t => t.toUpperCase()));

    allTypes.forEach(attackingType => {
        let multiplier = 1;  // Start with neutral damage (x1)

        // Loop through each of the defending types and adjust the multiplier
        typeSet.forEach(defenderType => {
            if (!TYPE_DATA[defenderType]) {
                console.error(`Invalid type: ${defenderType}`);  // Log the error instead of throwing
                return;
            }
            const typeInfo = TYPE_DATA[defenderType];

            // Apply immunity (0x damage)
            if (typeInfo.immunities && typeInfo.immunities.includes(attackingType)) {
                multiplier *= 0;
            }
            // Apply weakness (2x damage)
            else if (typeInfo.weaknesses && typeInfo.weaknesses.includes(attackingType)) {
                multiplier *= 2;
            }
            // Apply resistance (0.5x damage)
            else if (typeInfo.resistances && typeInfo.resistances.includes(attackingType)) {
                multiplier *= 0.5;
            }
        });

        // Classify the attacking type based on the multiplier
        if (multiplier === 0) effectiveness['x0'].push(attackingType);
        else if (multiplier === 0.25) effectiveness['x0.25'].push(attackingType);
        else if (multiplier === 0.5) effectiveness['x0.5'].push(attackingType);
        else if (multiplier === 1) effectiveness['x1'].push(attackingType);
        else if (multiplier === 2) effectiveness['x2'].push(attackingType);
        else if (multiplier === 4) effectiveness['x4'].push(attackingType);
    });

    // Remove empty arrays from the effectiveness result
    if (remove_empty_arrays) {
        Object.keys(effectiveness).forEach(key => {
            if (effectiveness[key].length === 0) {
                delete effectiveness[key];
            }
        });
    }

    return effectiveness;
}


export { calculateTypeEffectiveness };


