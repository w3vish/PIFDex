interface Abilities {
    [key: string] : {
        name: string,
        description: string
    }
}

const abilities: Abilities = {
    STENCH: {
        name: 'Stench',
        description: 'The stench may cause the target to flinch.'
    },
    DRIZZLE: {
        name: 'Drizzle',
        description: 'The Pokémon makes it rain if it appears in battle.'
    },
    SPEEDBOOST: {
        name: 'Speed Boost',
        description: 'Its Speed stat is gradually boosted.'
    },
    BATTLEARMOR: {
        name: 'Battle Armor',
        description: 'The Pokémon is protected against critical hits.'
    },
    STURDY: {
        name: 'Sturdy',
        description: 'It cannot be knocked out with one hit.'
    },
    DAMP: {
        name: 'Damp',
        description: 'Prevents the use of self-destructing moves.'
    },
    LIMBER: {
        name: 'Limber',
        description: 'The Pokémon is protected from paralysis.'
    },
    SANDVEIL: {
        name: 'Sand Veil',
        description: "Boosts the Pokémon's evasion in a sandstorm."
    },
    STATIC: {
        name: 'Static',
        description: 'Contact with the Pokémon may cause paralysis.'
    },
    VOLTABSORB: {
        name: 'Volt Absorb',
        description: 'Restores HP if hit by an Electric-type move.'
    },
    WATERABSORB: {
        name: 'Water Absorb',
        description: 'Restores HP if hit by a Water-type move.'
    },
    OBLIVIOUS: {
        name: 'Oblivious',
        description: 'Prevents it from becoming infatuated.'
    },
    CLOUDNINE: {
        name: 'Cloud Nine',
        description: 'Eliminates the effects of weather.'
    },
    COMPOUNDEYES: {
        name: 'Compound Eyes',
        description: "The Pokémon's accuracy is boosted."
    },
    INSOMNIA: {
        name: 'Insomnia',
        description: 'Prevents the Pokémon from falling asleep.'
    },
    COLORCHANGE: {
        name: 'Color Change',
        description: "Changes the Pokémon's type to the foe's move."
    },
    IMMUNITY: {
        name: 'Immunity',
        description: 'Prevents the Pokémon from getting poisoned.'
    },
    FLASHFIRE: {
        name: 'Flash Fire',
        description: "It powers up Fire-type moves if it's hit by one."
    },
    SHIELDDUST: {
        name: 'Shield Dust',
        description: 'Blocks the added effects of attacks taken.'
    },
    OWNTEMPO: {
        name: 'Own Tempo',
        description: 'Prevents the Pokémon from becoming confused.'
    },
    SUCTIONCUPS: {
        name: 'Suction Cups',
        description: 'Negates all moves that force switching out.'
    },
    INTIMIDATE: { name: 'Intimidate', description: "Lowers the foe's Attack stat." },
    SHADOWTAG: {
        name: 'Shadow Tag',
        description: 'Prevents the foe from escaping.'
    },
    ROUGHSKIN: {
        name: 'Rough Skin',
        description: 'Inflicts damage to the foe on contact.'
    },
    WONDERGUARD: {
        name: 'Wonder Guard',
        description: 'Only super-effective moves will hit.'
    },
    LEVITATE: {
        name: 'Levitate',
        description: 'Gives full immunity to all Ground-type moves.'
    },
    EFFECTSPORE: {
        name: 'Effect Spore',
        description: 'Contact may poison or cause paralysis or sleep.'
    },
    SYNCHRONIZE: {
        name: 'Synchronize',
        description: 'Passes a burn, poison, or paralysis to the foe.'
    },
    CLEARBODY: {
        name: 'Clear Body',
        description: 'Prevents other Pokémon from lowering its stats.'
    },
    NATURALCURE: {
        name: 'Natural Cure',
        description: 'All status problems heal when it switches out.'
    },
    LIGHTNINGROD: {
        name: 'Lightning Rod',
        description: 'Draws in all Electric-type moves to up Sp. Attack.'
    },
    SERENEGRACE: {
        name: 'Serene Grace',
        description: 'Boosts the likelihood of added effects appearing.'
    },
    SWIFTSWIM: {
        name: 'Swift Swim',
        description: "Boosts the Pokémon's Speed in rain."
    },
    CHLOROPHYLL: {
        name: 'Chlorophyll',
        description: "Boosts the Pokémon's Speed in sunshine."
    },
    ILLUMINATE: {
        name: 'Illuminate',
        description: 'Raises the likelihood of meeting wild Pokémon.'
    },
    TRACE: { name: 'Trace', description: "The Pokémon copies a foe's Ability." },
    HUGEPOWER: {
        name: 'Huge Power',
        description: "Raises the Pokémon's Attack stat."
    },
    POISONPOINT: {
        name: 'Poison Point',
        description: 'Contact with the Pokémon may poison the attacker.'
    },
    INNERFOCUS: {
        name: 'Inner Focus',
        description: 'The Pokémon is protected from flinching.'
    },
    MAGMAARMOR: {
        name: 'Magma Armor',
        description: 'Prevents the Pokémon from becoming frozen.'
    },
    WATERVEIL: {
        name: 'Water Veil',
        description: 'Prevents the Pokémon from getting a burn.'
    },
    MAGNETPULL: {
        name: 'Magnet Pull',
        description: 'Prevents Steel-type Pokémon from escaping.'
    },
    SOUNDPROOF: {
        name: 'Soundproof',
        description: 'Gives full immunity to all sound-based moves.'
    },
    RAINDISH: {
        name: 'Rain Dish',
        description: 'The Pokémon gradually regains HP in rain.'
    },
    SANDSTREAM: {
        name: 'Sand Stream',
        description: 'The Pokémon summons a sandstorm in battle.'
    },
    PRESSURE: {
        name: 'Pressure',
        description: "The Pokémon raises the foe's PP usage."
    },
    THICKFAT: {
        name: 'Thick Fat',
        description: 'Ups resistance to Fire- and Ice-type moves.'
    },
    EARLYBIRD: {
        name: 'Early Bird',
        description: 'The Pokémon awakens quickly from sleep.'
    },
    FLAMEBODY: {
        name: 'Flame Body',
        description: 'Contact with the Pokémon may burn the attacker.'
    },
    RUNAWAY: {
        name: 'Run Away',
        description: 'Enables a sure getaway from wild Pokémon.'
    },
    KEENEYE: {
        name: 'Keen Eye',
        description: 'Prevents other Pokémon from lowering accuracy.'
    },
    HYPERCUTTER: {
        name: 'Hyper Cutter',
        description: 'Prevents other Pokémon from lowering Attack stat.'
    },
    PICKUP: { name: 'Pickup', description: 'The Pokémon may pick up items.' },
    TRUANT: {
        name: 'Truant',
        description: "Pokémon can't attack on consecutive turns."
    },
    HUSTLE: {
        name: 'Hustle',
        description: 'Boosts the Attack stat, but lowers accuracy.'
    },
    CUTECHARM: {
        name: 'Cute Charm',
        description: 'Contact with the Pokémon may cause infatuation.'
    },
    PLUS: {
        name: 'Plus',
        description: 'Ups Sp. Atk if another Pokémon has Plus or Minus.'
    },
    MINUS: {
        name: 'Minus',
        description: 'Ups Sp. Atk if another Pokémon has Plus or Minus.'
    },
    FORECAST: {
        name: 'Forecast',
        description: 'Castform transforms with the weather.'
    },
    STICKYHOLD: {
        name: 'Sticky Hold',
        description: 'Protects the Pokémon from item theft.'
    },
    SHEDSKIN: {
        name: 'Shed Skin',
        description: 'The Pokémon may heal its own status problems.'
    },
    GUTS: {
        name: 'Guts',
        description: 'Boosts Attack if there is a status problem.'
    },
    MARVELSCALE: {
        name: 'Marvel Scale',
        description: 'Ups Defense if there is a status problem.'
    },
    LIQUIDOOZE: {
        name: 'Liquid Ooze',
        description: 'Damages attackers using any draining move.'
    },
    OVERGROW: {
        name: 'Overgrow',
        description: 'Powers up Grass-type moves in a pinch.'
    },
    BLAZE: {
        name: 'Blaze',
        description: 'Powers up Fire-type moves in a pinch.'
    },
    TORRENT: {
        name: 'Torrent',
        description: 'Powers up Water-type moves in a pinch.'
    },
    SWARM: {
        name: 'Swarm',
        description: 'Powers up Bug-type moves in a pinch.'
    },
    ROCKHEAD: {
        name: 'Rock Head',
        description: 'Protects the Pokémon from recoil damage.'
    },
    DROUGHT: {
        name: 'Drought',
        description: 'Turns the sunlight harsh if it is in battle.'
    },
    ARENATRAP: { name: 'Arena Trap', description: 'Prevents the foe from fleeing.' },
    VITALSPIRIT: {
        name: 'Vital Spirit',
        description: 'Prevents the Pokémon from falling asleep.'
    },
    WHITESMOKE: {
        name: 'White Smoke',
        description: 'Prevents other Pokémon from lowering its stats.'
    },
    PUREPOWER: {
        name: 'Pure Power',
        description: "Raises the Pokémon's Attack stat."
    },
    SHELLARMOR: {
        name: 'Shell Armor',
        description: 'The Pokémon is protected against critical hits.'
    },
    AIRLOCK: {
        name: 'Air Lock',
        description: 'Eliminates the effects of weather.'
    },
    TANGLEDFEET: {
        name: 'Tangled Feet',
        description: 'Raises evasion if the Pokémon is confused.'
    },
    MOTORDRIVE: {
        name: 'Motor Drive',
        description: 'Raises Speed if hit by an Electric-type move.'
    },
    RIVALRY: {
        name: 'Rivalry',
        description: 'Deals more damage to a foe of the same gender.'
    },
    STEADFAST: {
        name: 'Steadfast',
        description: 'Raises Speed each time the Pokémon flinches.'
    },
    SNOWCLOAK: { name: 'Snow Cloak', description: 'Raises evasion in a hailstorm.' },
    GLUTTONY: {
        name: 'Gluttony',
        description: 'Encourages the early use of a held Berry.'
    },
    ANGERPOINT: {
        name: 'Anger Point',
        description: 'Maxes Attack after taking a critical hit.'
    },
    UNBURDEN: {
        name: 'Unburden',
        description: 'Raises Speed if a held item is used.'
    },
    HEATPROOF: {
        name: 'Heatproof',
        description: 'Weakens the power of Fire-type moves.'
    },
    SIMPLE: {
        name: 'Simple',
        description: 'The Pokémon is prone to wild stat changes.'
    },
    DRYSKIN: {
        name: 'Dry Skin',
        description: 'Reduces HP if it is hot. Water restores HP.'
    },
    DOWNLOAD: {
        name: 'Download',
        description: "Adjusts power according to a foe's defenses."
    },
    IRONFIST: {
        name: 'Iron Fist',
        description: 'Boosts the power of punching moves.'
    },
    POISONHEAL: {
        name: 'Poison Heal',
        description: 'Restores HP if the Pokémon is poisoned.'
    },
    ADAPTABILITY: {
        name: 'Adaptability',
        description: 'Powers up moves of the same type.'
    },
    SKILLLINK: {
        name: 'Skill Link',
        description: 'Increases the frequency of multi-strike moves.'
    },
    HYDRATION: {
        name: 'Hydration',
        description: 'Heals status problems if it is raining.'
    },
    SOLARPOWER: {
        name: 'Solar Power',
        description: 'In sunshine, Sp. Atk is boosted but HP decreases.'
    },
    QUICKFEET: {
        name: 'Quick Feet',
        description: 'Boosts Speed if there is a status problem.'
    },
    NORMALIZE: {
        name: 'Normalize',
        description: "All the Pokémon's moves become the Normal type."
    },
    SNIPER: {
        name: 'Sniper',
        description: 'Powers up moves if they become critical hits.'
    },
    MAGICGUARD: {
        name: 'Magic Guard',
        description: 'The Pokémon only takes damage from attacks.'
    },
    NOGUARD: {
        name: 'No Guard',
        description: 'Ensures attacks by or against the Pokémon land.'
    },
    STALL: {
        name: 'Stall',
        description: 'The Pokémon moves after all other Pokémon do.'
    },
    TECHNICIAN: {
        name: 'Technician',
        description: "Powers up the Pokémon's weaker moves."
    },
    LEAFGUARD: {
        name: 'Leaf Guard',
        description: 'Prevents problems with status in sunny weather.'
    },
    KLUTZ: {
        name: 'Klutz',
        description: "The Pokémon can't use any held items."
    },
    MOLDBREAKER: {
        name: 'Mold Breaker',
        description: 'Moves can be used regardless of Abilities.'
    },
    SUPERLUCK: {
        name: 'Super Luck',
        description: 'Heightens the critical-hit ratios of moves.'
    },
    AFTERMATH: {
        name: 'Aftermath',
        description: 'Damages the attacker landing the finishing hit.'
    },
    ANTICIPATION: {
        name: 'Anticipation',
        description: "Senses a foe's dangerous moves."
    },
    FOREWARN: { name: 'Forewarn', description: 'Determines what moves a foe has.' },
    UNAWARE: {
        name: 'Unaware',
        description: 'Ignores any stat changes in the Pokémon.'
    },
    TINTEDLENS: {
        name: 'Tinted Lens',
        description: 'Powers up "not very effective" moves.'
    },
    FILTER: {
        name: 'Filter',
        description: 'Reduces damage from super-effective attacks.'
    },
    SLOWSTART: {
        name: 'Slow Start',
        description: 'Temporarily halves Attack and Speed.'
    },
    SCRAPPY: {
        name: 'Scrappy',
        description: 'Enables moves to hit Ghost-type Pokémon.'
    },
    STORMDRAIN: {
        name: 'Storm Drain',
        description: 'Draws in all Water-type moves to up Sp. Attack.'
    },
    ICEBODY: {
        name: 'Ice Body',
        description: 'The Pokémon gradually regains HP in a hailstorm.'
    },
    SOLIDROCK: {
        name: 'Solid Rock',
        description: 'Reduces damage from super-effective attacks.'
    },
    SNOWWARNING: {
        name: 'Snow Warning',
        description: 'The Pokémon summons a hailstorm in battle.'
    },
    HONEYGATHER: {
        name: 'Honey Gather',
        description: 'The Pokémon may gather Honey from somewhere.'
    },
    FRISK: {
        name: 'Frisk',
        description: "The Pokémon can check a foe's held item."
    },
    RECKLESS: {
        name: 'Reckless',
        description: 'Powers up moves that have recoil damage.'
    },
    MULTITYPE: {
        name: 'Multitype',
        description: 'Changes type to match the held Plate.'
    },
    FLOWERGIFT: {
        name: 'Flower Gift',
        description: 'Powers up party Pokémon when it is sunny.'
    },
    BADDREAMS: { name: 'Bad Dreams', description: "Reduces a sleeping foe's HP." },
    PICKPOCKET: {
        name: 'Pickpocket',
        description: 'Steals an item when hit by another Pokémon.'
    },
    SHEERFORCE: {
        name: 'Sheer Force',
        description: 'Removes added effects to increase move damage.'
    },
    CONTRARY: {
        name: 'Contrary',
        description: 'Makes stat changes have an opposite effect.'
    },
    UNNERVE: {
        name: 'Unnerve',
        description: 'Makes the foe nervous and unable to eat Berries.'
    },
    DEFIANT: {
        name: 'Defiant',
        description: 'When its stats are lowered its Attack increases.'
    },
    DEFEATIST: {
        name: 'Defeatist',
        description: 'Lowers stats when HP becomes half or less.'
    },
    CURSEDBODY: {
        name: 'Cursed Body',
        description: 'May disable a move used on the Pokémon.'
    },
    HEALER: {
        name: 'Healer',
        description: "May heal an ally's status conditions."
    },
    FRIENDGUARD: {
        name: 'Friend Guard',
        description: 'Reduces damage done to allies.'
    },
    WEAKARMOR: {
        name: 'Weak Armor',
        description: 'Physical attacks lower Defense and raise Speed.'
    },
    HEAVYMETAL: { name: 'Heavy Metal', description: "Doubles the Pokémon's weight." },
    LIGHTMETAL: { name: 'Light Metal', description: "Halves the Pokémon's weight." },
    MULTISCALE: {
        name: 'Multiscale',
        description: 'Reduces damage when HP is full.'
    },
    TOXICBOOST: {
        name: 'Toxic Boost',
        description: 'Powers up physical attacks when poisoned.'
    },
    FLAREBOOST: {
        name: 'Flare Boost',
        description: 'Powers up special attacks when burned.'
    },
    HARVEST: {
        name: 'Harvest',
        description: 'May create another Berry after one is used.'
    },
    TELEPATHY: {
        name: 'Telepathy',
        description: "Anticipates an ally's attack and dodges it."
    },
    MOODY: { name: 'Moody', description: 'Raises one stat and lowers another.' },
    OVERCOAT: {
        name: 'Overcoat',
        description: 'Protects the Pokémon from damage from weather.'
    },
    POISONTOUCH: {
        name: 'Poison Touch',
        description: 'May poison targets when a Pokémon makes contact.'
    },
    REGENERATOR: {
        name: 'Regenerator',
        description: 'Restores a little HP when withdrawn from battle.'
    },
    BIGPECKS: {
        name: 'Big Pecks',
        description: 'Protects from Defense-lowering attacks.'
    },
    SANDRUSH: {
        name: 'Sand Rush',
        description: "Boosts the Pokémon's Speed in a sandstorm."
    },
    WONDERSKIN: {
        name: 'Wonder Skin',
        description: 'Makes status-changing moves more likely to miss.'
    },
    ANALYTIC: {
        name: 'Analytic',
        description: 'Boosts move power when the Pokémon moves last.'
    },
    ILLUSION: {
        name: 'Illusion',
        description: 'Comes out disguised as the Pokémon in back.'
    },
    IMPOSTER: {
        name: 'Imposter',
        description: 'It transforms itself into the Pokémon it is facing.'
    },
    INFILTRATOR: {
        name: 'Infiltrator',
        description: "Passes through the foe's barrier and strikes."
    },
    MUMMY: {
        name: 'Mummy',
        description: 'Contact with this Pokémon spreads this Ability.'
    },
    MOXIE: {
        name: 'Moxie',
        description: 'Boosts Attack after knocking out any Pokémon.'
    },
    JUSTIFIED: {
        name: 'Justified',
        description: 'Raises Attack when hit by a Dark-type move.'
    },
    RATTLED: {
        name: 'Rattled',
        description: 'Some move types scare it and boost its Speed.'
    },
    MAGICBOUNCE: {
        name: 'Magic Bounce',
        description: 'Reflects status-changing moves.'
    },
    SAPSIPPER: {
        name: 'Sap Sipper',
        description: 'Boosts Attack when hit by a Grass-type move.'
    },
    PRANKSTER: {
        name: 'Prankster',
        description: 'Gives priority to a status move.'
    },
    SANDFORCE: {
        name: 'Sand Force',
        description: "Boosts certain moves' power in a sandstorm."
    },
    IRONBARBS: {
        name: 'Iron Barbs',
        description: 'Inflicts damage to the Pokémon on contact.'
    },
    ZENMODE: {
        name: 'Zen Mode',
        description: "Changes the Pokémon's shape when HP is halved."
    },
    VICTORYSTAR: {
        name: 'Victory Star',
        description: 'Boosts the accuracy of its allies and itself.'
    },
    TURBOBLAZE: {
        name: 'Turboblaze',
        description: 'Moves can be used regardless of Abilities.'
    },
    TERAVOLT: {
        name: 'Teravolt',
        description: 'Moves can be used regardless of Abilities.'
    },
    AROMAVEIL: {
        name: 'Aroma Veil',
        description: 'Protects against attacks that limit move choices.'
    },
    FLOWERVEIL: {
        name: 'Flower Veil',
        description: 'Protects Grass-type allies from stat/status effects.'
    },
    CHEEKPOUCH: {
        name: 'Cheek Pouch',
        description: 'Restores HP as well when the Pokémon eats a Berry.'
    },
    PROTEAN: {
        name: 'Protean',
        description: "It changes type to that of the move it's about to use."
    },
    FURCOAT: {
        name: 'Fur Coat',
        description: 'Halves the damage from physical moves.'
    },
    MAGICIAN: {
        name: 'Magician',
        description: 'Steals the held item of a Pokémon it hits.'
    },
    BULLETPROOF: {
        name: 'Bulletproof',
        description: 'Protects the Pokémon from some ball and bomb moves.'
    },
    COMPETITIVE: {
        name: 'Competitive',
        description: 'Sharply boosts Sp. Atk when a stat is lowered.'
    },
    STRONGJAW: {
        name: 'Strong Jaw',
        description: 'Boosts the power of biting moves.'
    },
    REFRIGERATE: {
        name: 'Refrigerate',
        description: 'Normal-type moves become Ice-type and powered up.'
    },
    SWEETVEIL: {
        name: 'Sweet Veil',
        description: 'Prevents itself and allies from falling asleep.'
    },
    STANCECHANGE: {
        name: 'Stance Change',
        description: 'Changes between Blade and Shield Forme with attacks.'
    },
    GALEWINGS: {
        name: 'Gale Wings',
        description: 'Flying-type moves gain priority when its HP is full.'
    },
    MEGALAUNCHER: {
        name: 'Mega Launcher',
        description: 'Powers up aura and pulse moves.'
    },
    GRASSPELT: {
        name: 'Grass Pelt',
        description: 'Boosts the Defense stat on Grassy Terrain.'
    },
    SYMBIOSIS: {
        name: 'Symbiosis',
        description: 'Passes its held item to an ally that has used theirs.'
    },
    TOUGHCLAWS: {
        name: 'Tough Claws',
        description: 'Powers up moves that make direct contact.'
    },
    PIXILATE: {
        name: 'Pixilate',
        description: 'Normal-type moves become Fairy-type and powered up.'
    },
    GOOEY: {
        name: 'Gooey',
        description: "Contact with it lowers the attacker's Speed stat."
    },
    AERILATE: {
        name: 'Aerilate',
        description: 'Normal-type moves become Flying-type and power up.'
    },
    PARENTALBOND: {
        name: 'Parental Bond',
        description: 'Parent and child each attacks.'
    },
    DARKAURA: {
        name: 'Dark Aura',
        description: "Powers up each Pokémon's Dark-type moves."
    },
    FAIRYAURA: {
        name: 'Fairy Aura',
        description: "Powers up each Pokémon's Fairy-type moves."
    },
    AURABREAK: {
        name: 'Aura Break',
        description: 'Reverses "Aura" Abilities to weaken affected moves.'
    },
    PRIMORDIALSEA: {
        name: 'Primordial Sea',
        description: 'Changes the weather to nullify Fire-type moves.'
    },
    DESOLATELAND: {
        name: 'Desolate Land',
        description: 'Changes the weather to nullify Water-type moves.'
    },
    DELTASTREAM: {
        name: 'Delta Stream',
        description: "Alters weather to remove Flying-type's weaknesses."
    },
    STAMINA: {
        name: 'Stamina',
        description: 'Boosts Defense when hit by an attack.'
    },
    WIMPOUT: {
        name: 'Wimp Out',
        description: 'Cowardly switches out if its HP becomes half or less.'
    },
    EMERGENCYEXIT: {
        name: 'Emergency Exit',
        description: 'Switches out if its HP becomes half or less.'
    },
    WATERCOMPACTION: {
        name: 'Water Compaction',
        description: 'Sharply ups Defense when hit by a Water-type move.'
    },
    MERCILESS: {
        name: 'Merciless',
        description: 'Its attacks are critical hits when it is poisoned.'
    },
    SHIELDSDOWN: {
        name: 'Shields Down',
        description: 'Its shell breaks if its HP becomes half or less.'
    },
    STAKEOUT: {
        name: 'Stakeout',
        description: "Deals doubles damage to a target's replacement."
    },
    WATERBUBBLE: {
        name: 'Water Bubble',
        description: 'Weakens incoming Fire-type moves and prevents burns.'
    },
    STEELWORKER: { name: 'Steelworker', description: 'Powers up Steel-type moves.' },
    BERSERK: {
        name: 'Berserk',
        description: 'Ups Sp. Atk if a hit makes its HP half or less.'
    },
    SLUSHRUSH: {
        name: 'Slush Rush',
        description: "Boosts the Pokémon's Speed stat in a hailstorm."
    },
    LONGREACH: {
        name: 'Long Reach',
        description: 'Uses moves without making contact with the target.'
    },
    LIQUIDVOICE: {
        name: 'Liquid Voice',
        description: 'Its sound-based moves become Water-type.'
    },
    TRIAGE: { name: 'Triage', description: 'Gives priority to a healing move.' },
    GALVANIZE: {
        name: 'Galvanize',
        description: 'Normal-type moves become Electric-type and powered.'
    },
    SURGESURFER: {
        name: 'Surge Surfer',
        description: 'Doubles Speed on Electric Terrain.'
    },
    SCHOOLING: {
        name: 'Schooling',
        description: 'Forms a powerful school while it has a lot of HP.'
    },
    DISGUISE: {
        name: 'Disguise',
        description: 'Its shroud protects it from an attack just once.'
    },
    BATTLEBOND: {
        name: 'Battle Bond',
        description: 'Defeating a foe lets it become Ash-Greninja.'
    },
    POWERCONSTRUCT: {
        name: 'Power Construct',
        description: 'Changes with other Cells if HP becomes half or less.'
    },
    CORROSION: {
        name: 'Corrosion',
        description: 'It can poison Steel- and Poison-type targets.'
    },
    COMATOSE: {
        name: 'Comatose',
        description: "It's always drowsing, and attacks without waking."
    },
    QUEENLYMAJESTY: {
        name: 'Queenly Majesty',
        description: 'Makes foes unable to use priority attacks.'
    },
    INNARDSOUT: {
        name: 'Innards Out',
        description: 'Damages an attacker that lands the finishing hit.'
    },
    DANCER: {
        name: 'Dancer',
        description: "Repeats another Pokémon's dance move immediately."
    },
    BATTERY: {
        name: 'Battery',
        description: "Powers up ally Pokémon's special moves."
    },
    FLUFFY: {
        name: 'Fluffy',
        description: 'Resists contact damage but weaker to Fire-type.'
    },
    DAZZLING: {
        name: 'Dazzling',
        description: 'Makes foes unable to use priority attacks.'
    },
    SOULHEART: {
        name: 'Soul-Heart',
        description: 'Boosts Sp. Atk each time a Pokémon faints.'
    },
    TANGLINGHAIR: {
        name: 'Tangling Hair',
        description: "Contact with it lowers the attacker's Speed."
    },
    RECEIVER: {
        name: 'Receiver',
        description: 'Copies the Ability of a defeated ally.'
    },
    POWEROFALCHEMY: {
        name: 'Power of Alchemy',
        description: 'Copies the Ability of a defeated ally.'
    },
    BEASTBOOST: {
        name: 'Beast Boost',
        description: 'Boosts its best stat each time it deals a KO.'
    },
    RKSSYSTEM: {
        name: 'RKS System',
        description: 'Its type matches the memory disc it holds.'
    },
    ELECTRICSURGE: {
        name: 'Electric Surge',
        description: 'Turns the ground into Electric Terrain.'
    },
    PSYCHICSURGE: {
        name: 'Psychic Surge',
        description: 'Turns the ground into Psychic Terrain.'
    },
    MISTYSURGE: {
        name: 'Misty Surge',
        description: 'Turns the ground into Misty Terrain.'
    },
    GRASSYSURGE: {
        name: 'Grassy Surge',
        description: 'Turns the ground into Grassy Terrain.'
    },
    FULLMETALBODY: {
        name: 'Full Metal Body',
        description: 'Prevents other Pokémon from lowering its stats.'
    },
    SHADOWSHIELD: {
        name: 'Shadow Shield',
        description: 'Resists damage while its HP is full.'
    },
    PRISMARMOR: {
        name: 'Prism Armor',
        description: 'Reduces damage from super-effective attacks.'
    },
    NEUROFORCE: {
        name: 'Neuroforce',
        description: 'Powers up moves that are super-effective.'
    }
}

export { abilities }