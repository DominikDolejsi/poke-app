import { Pokemon } from "./api/v1/pokemons/pokemons.model.js";
import {
  PokemonPokemon,
  PokemonSpecies,
  defaultVarietyUrl,
  variety,
} from "./seed/types.js";
import {
  formatStats,
  findNationalIndex,
  returnEvolvedFrom,
  resolveEvolvedTo,
  advancedFetch,
  formatToIndexString,
  writePokemonToDB,
  findGeneraName,
  genderRateToGender,
  resolveGeneration,
  prepareDBTypes,
  resolveTypes,
  resolveSprites,
} from "./seed/utils.js";

const seedDBWithPokemon = async () => {
  try {
    let index = 1;
    let isEndOfPokedex = false;

    const typesDB = await prepareDBTypes();

    while (!isEndOfPokedex) {
      let defaultVarietyUrl: defaultVarietyUrl = null;

      const speciesResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${index}`,
      );

      if (speciesResponse.status === 404) {
        isEndOfPokedex = true;
        break;
      }

      const speciesData: PokemonSpecies = await speciesResponse.json();

      speciesData.varieties.forEach((variety: variety) => {
        if (variety.is_default === true) {
          defaultVarietyUrl = variety.pokemon.url;
        }
      });

      if (defaultVarietyUrl === null) return;

      const pokemonData: PokemonPokemon = await advancedFetch(
        defaultVarietyUrl,
      );

      const previousEvolution = await returnEvolvedFrom(speciesData);

      let nextEvolution = null;

      if (speciesData.evolution_chain) {
        nextEvolution = await resolveEvolvedTo(speciesData);
      }

      // ---------- There comes the databse part -------------

      const pokemonName = speciesData.name;
      const pokemonSpecies = findGeneraName(speciesData.genera);
      const pokemonGender = genderRateToGender(speciesData.gender_rate);
      const pokemonNationalNumber = findNationalIndex(
        speciesData.pokedex_numbers,
      );
      const pokemonGeneration = resolveGeneration(speciesData.generation);
      const pokemonStats = formatStats(pokemonData.stats);
      const pokemonTypes = resolveTypes(pokemonData.types, typesDB);
      const pokemonSprites = resolveSprites(pokemonData.sprites.other);
      const pokemonNextEvoluution = formatToIndexString(nextEvolution);
      const pokemonPreviousEvoluution = formatToIndexString(previousEvolution);

      if (pokemonSpecies === null) {
        console.log("species is null");
        return;
      }
      if (pokemonGeneration === null) {
        console.log("generation is null");
        return;
      }
      if (pokemonTypes === null) {
        console.log("type is null");
        return;
      }

      const newPokemon: Pokemon = {
        name: pokemonName,
        species: pokemonSpecies,
        gender: pokemonGender,
        nationalNumber: pokemonNationalNumber,
        generation: pokemonGeneration,
        health: pokemonStats.health,
        speed: pokemonStats.speed,
        attack: pokemonStats.attack,
        defence: pokemonStats.defence,
        specialAttack: pokemonStats.specialAttack,
        specialDefence: pokemonStats.specialDefence,
        artworkSprite: pokemonSprites.artworkSprite,
        artworkSpriteShiny: pokemonSprites.artworkSpriteShiny,
        homeMale: pokemonSprites.homeMale,
        homeFemale: pokemonSprites.homeFemale,
        homeMaleShiny: pokemonSprites.homeMaleShiny,
        homeFemaleShiny: pokemonSprites.homeFemaleShiny,
        nextEvolution: pokemonNextEvoluution,
        previousEvolution: pokemonPreviousEvoluution,
        firstType: pokemonTypes.firstType,
        secondType: pokemonTypes.secondType,
      };

      const strNewPokemon = JSON.stringify(newPokemon);

      console.log(`Adding pokemon`);
      console.dir(newPokemon, { depth: Infinity });

      const data = await writePokemonToDB(strNewPokemon);

      console.log(`Added ${data.name} to the DB`);
      console.dir(data, { depth: Infinity });

      index += 1;

      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
  } catch (error) {
    console.error(error);
  }
};

seedDBWithPokemon();

const fillDBWithPokemonTest = async () => {
  try {
    let index = 32;
    let isEndOfPokedex = false;

    const typesDB = await prepareDBTypes();

    while (!isEndOfPokedex) {
      let defaultVarietyUrl: defaultVarietyUrl = null;

      const speciesResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${index}`,
      );

      if (speciesResponse.status === 404) {
        isEndOfPokedex = true;
        break;
      }

      const speciesData: PokemonSpecies = await speciesResponse.json();

      speciesData.varieties.forEach((variety: variety) => {
        if (variety.is_default === true) {
          defaultVarietyUrl = variety.pokemon.url;
        }
      });

      if (defaultVarietyUrl === null) return;

      const pokemonData: PokemonPokemon = await advancedFetch(
        defaultVarietyUrl,
      );

      const previousEvolution = await returnEvolvedFrom(speciesData);

      let nextEvolution = null;

      if (speciesData.evolution_chain) {
        nextEvolution = await resolveEvolvedTo(speciesData);
      }

      // ---------- There comes the databse part -------------

      const pokemonName = speciesData.name;
      const pokemonSpecies = findGeneraName(speciesData.genera);
      const pokemonGender = genderRateToGender(speciesData.gender_rate);
      const pokemonNationalNumber = findNationalIndex(
        speciesData.pokedex_numbers,
      );
      const pokemonGeneration = resolveGeneration(speciesData.generation);
      const pokemonStats = formatStats(pokemonData.stats);
      const pokemonTypes = resolveTypes(pokemonData.types, typesDB);
      const pokemonSprites = resolveSprites(pokemonData.sprites.other);
      const pokemonNextEvoluution = formatToIndexString(nextEvolution);
      const pokemonPreviousEvoluution = formatToIndexString(previousEvolution);

      if (pokemonSpecies === null) {
        console.log("species is null");
        return;
      }
      if (pokemonGeneration === null) {
        console.log("generation is null");
        return;
      }
      if (pokemonTypes === null) {
        console.log("type is null");
        return;
      }

      const newPokemon: Pokemon = {
        name: pokemonName,
        species: pokemonSpecies,
        gender: pokemonGender,
        nationalNumber: pokemonNationalNumber,
        generation: pokemonGeneration,
        health: pokemonStats.health,
        speed: pokemonStats.speed,
        attack: pokemonStats.attack,
        defence: pokemonStats.defence,
        specialAttack: pokemonStats.specialAttack,
        specialDefence: pokemonStats.specialDefence,
        artworkSprite: pokemonSprites.artworkSprite,
        artworkSpriteShiny: pokemonSprites.artworkSpriteShiny,
        homeMale: pokemonSprites.homeMale,
        homeFemale: pokemonSprites.homeFemale,
        homeMaleShiny: pokemonSprites.homeMaleShiny,
        homeFemaleShiny: pokemonSprites.homeFemaleShiny,
        nextEvolution: pokemonNextEvoluution,
        previousEvolution: pokemonPreviousEvoluution,
        firstType: pokemonTypes.firstType,
        secondType: pokemonTypes.secondType,
      };

      const strNewPokemon = JSON.stringify(newPokemon);

      console.log(`Adding pokemon`);
      console.dir(newPokemon, { depth: Infinity });

      index += 1;

      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
  } catch (error) {
    console.error(error);
  }
};

// fillDBWithPokemonTest();