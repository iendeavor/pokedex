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
 * @typedef {import("../entity/result").Result<number, 'BadRequest' | 'Conflict' | 'Unknown'>} Res
 */

/**
 * @param {Req} req
 * @return {Res}
 */
export const execute = (req) => {
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

  const result = req.repo.insert(
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
    value: req.number,
  };
};
