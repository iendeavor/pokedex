import { Pokemon } from "../entity/pokemon.js";
import { PokemonNumber } from "../entity/pokemon-number.js";

/**
 * @typedef {import("../entity/result").Result<PokemonNumber, 'Conflict' | 'Unknown'>} InsertResult
 */

export class PokemonRepo {
  /**
   * @param {Pokemon} pokemon
   * @returns {InsertResult}
   */
  insert(pokemon) {
    throw Error("Unimplemented");
  }
}
