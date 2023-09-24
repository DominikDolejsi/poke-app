import {
  Stats,
  FormatedStats,
  indexes,
  speciesData,
  genera,
  generation,
  pokemonType,
  DBtype,
  sprites,
  PokemonChain,
  chainDeep,
} from "./types.js";

export const formatStats = (stats: Stats) => {
  const formatedStats: FormatedStats = {
    health: 0,
    speed: 0,
    specialAttack: 0,
    specialDefence: 0,
    defence: 0,
    attack: 0,
  };

  stats.forEach((stat) => {
    if (stat.stat.name === "hp") {
      formatedStats.health = stat.base_stat;
    }
    if (stat.stat.name === "attack") {
      formatedStats.attack = stat.base_stat;
    }
    if (stat.stat.name === "defense") {
      formatedStats.defence = stat.base_stat;
    }
    if (stat.stat.name === "special-attack") {
      formatedStats.specialAttack = stat.base_stat;
    }
    if (stat.stat.name === "special-defense") {
      formatedStats.specialDefence = stat.base_stat;
    }
    if (stat.stat.name === "speed") {
      formatedStats.speed = stat.base_stat;
    }
  });

  return formatedStats;
};

export const findNationalIndex = (indexes: indexes) => {
  let nationalIndex = 0;
  indexes.every((index) => {
    if (index.pokedex.name === "national") {
      nationalIndex = index.entry_number;
      return false;
    }
    return true;
  });
  return nationalIndex;
};

export const returnEvolvedFrom = async (speciesData: speciesData) => {
  if (!speciesData.evolves_from_species) return null;

  const evolvesFromArray = [];

  const evolvesFromData = await advancedFetch(
    speciesData.evolves_from_species.url,
  );

  evolvesFromArray.push(findNationalIndex(evolvesFromData.pokedex_numbers));

  return evolvesFromArray;
};

export const returnEvolvedToArray = (
  chain: chainDeep | undefined,
  originName: string,
) => {
  if (!chain) return null;
  if (chain.species.name === originName) {
    if (chain.evolves_to.length < 1) return "final";
    return chain.evolves_to;
  }

  if (chain.evolves_to.length < 1) return [];
  const arrayception: any = [];
  for (let index = 0; index < chain.evolves_to.length; index++) {
    arrayception.push(
      returnEvolvedToArray(chain.evolves_to[index], originName),
    );
  }

  return arrayception;
};

export const resolveEvolvedTo = async (speciesData: speciesData) => {
  if (!speciesData.evolution_chain) return null;

  const chainData: PokemonChain = await advancedFetch(
    speciesData.evolution_chain.url,
  );

  const evolvedToArray = await returnEvolvedToArray(
    chainData.chain,
    speciesData.name,
  );

  const flatEvolvedToArray = evolvedToArray.flat(Infinity);

  if (flatEvolvedToArray[0] === "final") return null;
  
  const arrayOfIndexes: number[] = [];
  for (const species of flatEvolvedToArray) {
    const speciesData = await advancedFetch(species.species.url);

    arrayOfIndexes.push(findNationalIndex(speciesData.pokedex_numbers));
  }

  return arrayOfIndexes;
};

export const advancedFetch = async (
  url: string,
  repetition = 1,
): Promise<any> => {
  const OPTIONS = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, OPTIONS);

  if (response.status !== 200 && repetition < 4) {
    if (repetition < 4) {
      return advancedFetch(url, repetition + 1);
    } else {
      throw new Error(`Failed fetching ${url}`);
    }
  }

  const data = await response.json();

  return data;
};

export const formatToIndexString = (array: number[] | null | undefined) => {
  if (!array) return null;

  const stringArray: string[] = [];

  array.forEach((number) => {
    stringArray.push(number.toString());
  });

  return stringArray.join(" ");
};

export const writePokemonToDB = async (body: any) => {
  const OPTIONS = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  };

  const response = await fetch(
    "http://localhost:3000/api/v1/pokemons",
    OPTIONS,
  );

  const data = await response.json();

  return data;
};

export const findGeneraName = (genera: genera[]) => {
  let name = null;
  if (!genera) return name;

  genera.every((value) => {
    if (value.language.name === "en") {
      name = value.genus;
      return false;
    }
    return true;
  });

  return name;
};

export const genderRateToGender = (gender_rate: number) => {
  if (gender_rate < 1 || gender_rate === 8) {
    return false;
  }
  return true;
};

export const resolveGeneration = (generation: generation) => {
  if (!generation) return null;
  const genName = generation.name;

  const genRomanNumeral = genName.split("-")[1];

  const genIntNumber = romanToIntNumber(genRomanNumeral);

  return genIntNumber;
};

const romanToIntNumber = (romanNumeral: string | undefined) => {
  if (!romanNumeral) return 0;
  switch (romanNumeral) {
    case "i":
      return 1;
      break;

    case "ii":
      return 2;
      break;

    case "iii":
      return 3;
      break;

    case "iv":
      return 4;
      break;

    case "v":
      return 5;
      break;

    case "vi":
      return 6;
      break;

    case "vii":
      return 7;
      break;

    case "viii":
      return 8;
      break;

    case "ix":
      return 9;
      break;

    case "x":
      return 10;
      break;

    case "xi":
      return 11;
      break;

    case "xii":
      return 12;
      break;

    case "xiii":
      return 13;
      break;

    case "xiv":
      return 14;
      break;

    case "xv":
      return 15;
      break;

    default:
      return 0;
      break;
  }
};

export const resolveTypes = (pokemonTypes: pokemonType[], typesDB: DBtype) => {
  if (!pokemonTypes) return null;

  let firstType = 0;
  let secondType = 0;

  pokemonTypes.forEach((type) => {
    typesDB.forEach((dbType) => {
      if (type.type.name === dbType.name) {
        if (type.slot === 1) {
          firstType = dbType.id;
        } else {
          secondType = dbType.id;
        }
      }
    });
  });

  return { firstType: { id: firstType }, secondType: { id: secondType } };
};

export const prepareDBTypes = async () => {
  const response = await fetch("http://localhost:3000/api/v1/pokemontypes");

  const data = await response.json();

  const typesDB = data.map((type: any) => {
    return { id: type.id, name: type.name };
  });

  return typesDB;
};

export const resolveSprites = (sprites: sprites) => {
  const home = sprites.home;
  const artwork = sprites["official-artwork"];

  return {
    artworkSprite: artwork.front_default ?? null,
    artworkSpriteShiny: artwork.front_shiny ?? null,
    homeMale: home.front_default,
    homeFemale: home.front_female,
    homeMaleShiny: home.front_shiny,
    homeFemaleShiny: home.front_shiny_female,
  };
};
