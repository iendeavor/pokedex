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
 * @typedef {import("../entity/result").Result<undefined, 'BadRequest' | 'NotFound' | 'Unknown'>} Res
 */

/**
 * @param {Req} req
 * @returns {Res}
 */
export const execute = ({ repo, number }) => {
  if (PokemonNumber.tryToPokemonNumber(number).status === "rejected") {
    return {
      status: "rejected",
      reason: "BadRequest",
    };
  }

  const result = repo.delete(number);
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
    value: undefined,
  };
};
