import { PokemonNumber } from "../entity/pokemon-number.js";
import { PokemonName } from "../entity/pokemon-name.js";
import { PokemonTypes } from "../entity/pokemon-types.js";

/**
 * @typedef Req
 * @property {number} number
 * @property {string} name
 * @property {string[]} types
 */

/**
 * @typedef {Result<number, 'BadRequest'>} Res
 */

/**
 * @param {Req} req
 * @return {Res}
 */
export const execute = (req) => {
  if (
    PokemonNumber.tryToPokemonNumber(req.number).status === "rejected" ||
    PokemonName.tryToPokemonName(req.name).status === "rejected" ||
    PokemonTypes.tryToPokemonTypes(req.types).status === "rejected"
  ) {
    return {
      status: "rejected",
      reason: "BadRequest",
    };
  }

  return {
    status: "fulfilled",
    value: req.number,
  };
};
