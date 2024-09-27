const processTypes = (types: string) => {
  // All 18 Pokémon types
  const typesArray = [
    "NORMAL", "FIRE", "WATER", "GRASS", "ELECTRIC", "ICE", "FIGHTING", 
    "POISON", "GROUND", "FLYING", "PSYCHIC", "BUG", "ROCK", "GHOST", 
    "DRAGON", "DARK", "STEEL", "FAIRY"
  ];

  // Array to hold detected types
  const detectedTypes: string[] = [];

  // Loop over each type and check if it's in the input string
  typesArray.forEach((type) => {
    if (types.includes(type)) {
      detectedTypes.push(type);
      // Remove the found type from the string to prevent duplicate detection
      types = types.replace(type, '');
    }
  });

  return detectedTypes;
};

export default processTypes

