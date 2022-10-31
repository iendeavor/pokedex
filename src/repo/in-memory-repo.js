import { Pokemon } from "../domain/entity/pokemon.js";
import { PokemonNumber } from "../domain/entity/pokemon-number.js";
import { PokemonRepo } from "../domain/repo/pokemon-repo.js";

export class InMemoryPokemonRepo extends PokemonRepo {
  /**
   * @private
   * @type {Pokemon[]}
   */
  pokemons = [];

  /**
   * @private
   * @type {boolean}
   */
  error = false;

  /**
   * @param {Pokemon} pokemon
   * @returns {import("../domain/repo/pokemon-repo").InsertResult}
   */
  insert(pokemon) {
    if (this.error) {
      return {
        status: "rejected",
        reason: "Unknown",
      };
    }

    if (this.hasExists(pokemon)) {
      return {
        status: "rejected",
        reason: "Conflict",
      };
    }

    this.pokemons.push(pokemon);
    return {
      status: "fulfilled",
      value: pokemon,
    };
  }

  /**
   * @private
   * @param {Pokemon} pokemon
   * @returns {boolean}
   */
  hasExists(pokemon) {
    return this.pokemons.some(
      (p) =>
        PokemonNumber.fromPokemonNumber(p.number) ===
        PokemonNumber.fromPokemonNumber(pokemon.number)
    );
  }

  /**
   * @private
   */
  withError() {
    this.error = true;
  }
}
