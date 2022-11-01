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
   * @returns {import("../domain/repo/pokemon-repo.js").FetchAllResult}
   */
  fetchAll() {
    if (this.error) {
      return {
        status: "rejected",
        reason: "Unknown",
      };
    }

    return {
      status: "fulfilled",
      value: this.pokemons
        .slice()
        .sort(
          (a, b) =>
            PokemonNumber.fromPokemonNumber(a.number) -
            PokemonNumber.fromPokemonNumber(b.number)
        ),
    };
  }

  /**
   * @param {number} number
   * @returns {import("../domain/repo/pokemon-repo.js").FetchResult}
   */
  fetch(number) {
    if (this.error) {
      return {
        status: "rejected",
        reason: "Unknown",
      };
    }

    const pokemon = this.pokemons.find(
      (pokemon) => PokemonNumber.fromPokemonNumber(pokemon.number) === number
    );
    if (pokemon === undefined) {
      return {
        status: "rejected",
        reason: "NotFound",
      };
    }

    return {
      status: "fulfilled",
      value: pokemon,
    };
  }

  /**
   * @param {number} number
   * @returns {import("../domain/repo/pokemon-repo.js").DeleteResult}
   */
  delete(number) {
    if (this.error) {
      return {
        status: "rejected",
        reason: "Unknown",
      };
    }

    const index = this.pokemons.findIndex(
      (pokemon) => PokemonNumber.fromPokemonNumber(pokemon.number) === number
    );
    if (index === -1) {
      return {
        status: "rejected",
        reason: "NotFound",
      };
    }

    this.pokemons = [
      ...this.pokemons.slice(0, index),
      ...this.pokemons.slice(index + 1),
    ];
    return {
      status: "fulfilled",
      value: undefined,
    };
  }

  /**
   * @private
   */
  withError() {
    this.error = true;
  }
}
