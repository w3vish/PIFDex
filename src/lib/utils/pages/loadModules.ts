import { apiURL } from "../constants";

interface Module {
    [key: string]: string;
  }
  
  interface ModuleArg {
    moduleName: 'home' | 'types' | 'abilities' | 'moves' | 'self-fusions' | 'triple-fusions' | 'base-pokemons';
  }
  
  const baseURL = apiURL;
  const routes: Module = {
    home: `${baseURL}/pages/home`,
    types: `${baseURL}/pages/types`,
    abilities: `${baseURL}/pages/abilities`,
    moves: `${baseURL}/pages/moves`,
    'self-fusions': `${baseURL}/pages/self-fusions`,
    'triple-fusions': `${baseURL}/pages/triple-fusions`,
    'base-pokemons': `${baseURL}/pages/base-pokemons`,
  };
  
  const loadModules = async (moduleName: ModuleArg['moduleName']) => {
    const reqURL = routes[moduleName];
  
    if (!reqURL) {
      throw new Error(`Module ${moduleName} not found`);
    }
  
    try {
      const res = await fetch(reqURL);
  
      if (!res.ok) {
        throw new Error(`Failed to load data for module ${moduleName}`);
      }
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(`Error fetching data for ${moduleName}:`, error);
      throw error;
    }
  };
  
  export default loadModules;
  