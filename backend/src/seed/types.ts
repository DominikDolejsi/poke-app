import { pokemon } from "../api/v1/pokemons/pokemons.model.js";

export type Stat = {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
};

export type Stats = Stat[];

export type FormatedStats = {
  health: number;
  speed: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
};

export type defaultVarietyUrl = string | null;

export type variety = {
  is_default: boolean;
  pokemon: {
    url: string;
  };
};

export type varietyArray = variety[];

export type index = {
  pokedex: {
    name: string;
  };
  entry_number: number;
};

export type indexes = index[];

export type speciesData = {
  evolves_from_species: {
    url: string;
  } | null;
  evolution_chain: {
    url: string;
  } | null;
  name: string;
};

export type genera = {
  genus: string;
  language: {
    name: string;
  };
};

export type generation = {
  name: string;
  url: string;
};

export type pokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type DBtype = {
  id: number;
  name: string;
}[];

export type sprites = {
  front_default: string | null;
  other: {
    home: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    ["official-artwork"]: {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
};

export type PokemonSpecies = {
  evolution_chain: {
    url: string;
  };
  evolves_from_species: {
    name: string;
    url: string;
  } | null;
  gender_rate: number;
  genera: {
    genus: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  generation: {
    name: string;
    url: string;
  };
  name: string;
  pokedex_numbers: {
    entry_number: number;
    pokedex: {
      name: string;
      url: string;
    };
  }[];
  varieties: {
    is_default: boolean;
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};

export type PokemonPokemon = {
  name: string;
  sprites: sprites;
  stats: Stat[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  forms: {
    name: string;
    url: string;
  }[];
};

export type chainDeep = {
  species: {
    name: string;
    url: string;
  };
  evolves_to: chainDeep[];
};

export type PokemonChain = {
  chain: chainDeep;
};
