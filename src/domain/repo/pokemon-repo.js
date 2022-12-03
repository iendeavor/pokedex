import { Pokemon } from "../entity/pokemon.js";

/**
 * @typedef {Promise<import("../entity/result").Result<Pokemon, 'Conflict' | 'Unknown'>>} InsertResult
 */

/**
 * @typedef {Promise<import("../entity/result").Result<Pokemon[], 'Unknown'>>} FetchAllResult
 */

/**
 * @typedef {Promise<import("../entity/result").Result<Pokemon, 'NotFound' | 'Unknown'>>} FetchResult
 */

/**
 * @typedef {Promise<import("../entity/result").Result<undefined, 'NotFound' | 'Unknown'>>} DeleteResult
 */

export class PokemonRepo {
  /**
   * @param {Pokemon} pokemon
   * @returns {InsertResult}
   */
  insert(pokemon) {
    throw Error("Unimplemented");
  }

  /**
   * Returns all pokemons ordered by increasing number.
   *
   * @returns {FetchAllResult}
   */
  fetchAll() {
    throw Error("Unimplemented");
  }

  /**
   * @param {number} number
   * @returns {FetchResult}
   */
  fetch(number) {
    throw Error("Unimplemented");
  }

  /**
   * @param {number} number
   * @returns {DeleteResult}
   */
  delete(number) {
    throw Error("Unimplemented");
  }
}
