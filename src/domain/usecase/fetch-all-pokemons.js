import { PokemonName } from "../entity/pokemon-name.js";
import { PokemonNumber } from "../entity/pokemon-number.js";
import { PokemonTypes } from "../entity/pokemon-types.js";
import { PokemonRepo } from "../repo/pokemon-repo.js";

/**
 * @typedef Req
 * @property {PokemonRepo} repo
 */

/**
 * @typedef {Promise<import("../entity/result").Result<{ number: number, name: string, types: string[] }[], 'Unknown'>>} Res
 */

/**
 * @param {Req} req
 * @returns {Res}
 */
export const execute = async ({ repo }) => {
  const result = await repo.fetchAll();

  if (result.status === "rejected") {
    return {
      status: "rejected",
      reason: "Unknown",
    };
  }

  return {
    status: "fulfilled",
    value: result.value.map((pokemon) => {
      return {
        number: PokemonNumber.fromPokemonNumber(pokemon.number),
        name: PokemonName.fromPokemonName(pokemon.name),
        types: PokemonTypes.fromPokemonTypes(pokemon.types),
      };
    }),
  };
};
