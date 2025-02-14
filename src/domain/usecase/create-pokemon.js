import { PokemonNumber } from "../entity/pokemon-number.js";
import { PokemonName } from "../entity/pokemon-name.js";
import { PokemonTypes } from "../entity/pokemon-types.js";
import { PokemonRepo } from "../repo/pokemon-repo.js";
import { Pokemon } from "../entity/pokemon.js";
import { unwrap } from "../entity/result.js";

/**
 * @typedef Req
 * @property {PokemonRepo} repo
 * @property {number} number
 * @property {string} name
 * @property {string[]} types
 */

/**
 * @typedef {Promise<import("../entity/result").Result<{ number: number, name: string, types: string[]}, 'BadRequest' | 'Conflict' | 'Unknown'>>} Res
 */

/**
 * @param {Req} req
 * @return {Res}
 */
export const execute = async (req) => {
  const pokemonNumber = PokemonNumber.tryToPokemonNumber(req.number);
  const pokemonName = PokemonName.tryToPokemonName(req.name);
  const pokemonTypes = PokemonTypes.tryToPokemonTypes(req.types);
  if (
    pokemonNumber.status === "rejected" ||
    pokemonName.status === "rejected" ||
    pokemonTypes.status === "rejected"
  ) {
    return {
      status: "rejected",
      reason: "BadRequest",
    };
  }

  const result = await req.repo.insert(
    new Pokemon({
      pokemonNumber: unwrap(pokemonNumber),
      pokemonName: unwrap(pokemonName),
      pokemonTypes: unwrap(pokemonTypes),
    })
  );
  if (result.status === "rejected") {
    switch (result.reason) {
      case "Conflict":
        return {
          status: "rejected",
          reason: "Conflict",
        };
      case "Unknown":
        return {
          status: "rejected",
          reason: "Unknown",
        };
      default: {
        throw Error("Unimplemented");
      }
    }
  }

  return {
    status: "fulfilled",
    value: {
      number: PokemonNumber.fromPokemonNumber(result.value.number),
      name: PokemonName.fromPokemonName(result.value.name),
      types: PokemonTypes.fromPokemonTypes(result.value.types),
    },
  };
};
