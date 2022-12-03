import { PokemonName } from "../entity/pokemon-name.js";
import { PokemonNumber } from "../entity/pokemon-number.js";
import { PokemonTypes } from "../entity/pokemon-types.js";
import { PokemonRepo } from "../repo/pokemon-repo.js";

/**
 * @typedef Req
 * @property {PokemonRepo} repo
 * @property {number} number
 */

/**
 * @typedef {Promise<import("../entity/result").Result<{ number: number, name: string, types: string[] }, 'BadRequest' | 'NotFound' | 'Unknown'>>} Res
 */

/**
 * @param {Req} req
 * @returns {Res}
 */
export const execute = async ({ repo, number }) => {
  if (PokemonNumber.tryToPokemonNumber(number).status === "rejected") {
    return {
      status: "rejected",
      reason: "BadRequest",
    };
  }

  const result = await repo.fetch(number);
  if (result.status === "rejected") {
    switch (result.reason) {
      case "NotFound":
        return {
          status: "rejected",
          reason: "NotFound",
        };
      case "Unknown":
      default: {
        return {
          status: "rejected",
          reason: "Unknown",
        };
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
