import { Pokemon } from "../entity/pokemon.js";

/**
 * @typedef {import("../entity/result").Result<Pokemon, 'Conflict' | 'Unknown'>} InsertResult
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
