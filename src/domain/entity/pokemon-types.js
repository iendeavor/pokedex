import { unwrap } from "./result.js";

export class PokemonTypes {
  /**
   * @private
   * @type {PokemonType[]}
   */
  types;

  /**
   * @private
   * @param {PokemonType[]} n
   */
  constructor(n) {
    this.types = n;
  }

  /**
   * @param {string[]} n
   * @return {import("./result").Result<PokemonTypes, 'invalid'>}
   */
  static tryToPokemonTypes(n) {
    /**
     * @type {PokemonType[]}
     */
    const types = [];

    if (Array.isArray(n) === false) {
      return {
        status: "rejected",
        reason: "invalid",
      };
    }
    for (let maybeType of n) {
      const result = PokemonType.tryToPokemonType(maybeType);
      if (result.status === "rejected") {
        return {
          status: "rejected",
          reason: "invalid",
        };
      }

      types.push(result.value);
    }

    return {
      status: "fulfilled",
      value: new PokemonTypes(types),
    };
  }

  /**
   * @param {PokemonTypes} n
   * @return {string[]}
   */
  static fromPokemonTypes(n) {
    return n.types.map((type) => PokemonType.fromPokemonType(type));
  }

  /**
   * @private
   * @returns {PokemonTypes}
   */
  static pikachu() {
    return new PokemonTypes([unwrap(PokemonType.tryToPokemonType("Electric"))]);
  }

  /**
   * @private
   * @returns {PokemonTypes}
   */
  static charmander() {
    return new PokemonTypes([unwrap(PokemonType.tryToPokemonType("Fire"))]);
  }
}

/**
 * @typedef {'Electric' | 'Fire'} Type
 */

class PokemonType {
  /**
   * @private
   * @type {Type}
   */
  type;

  /**
   * @private
   * @param {Type} n
   */
  constructor(n) {
    this.type = n;
  }

  /**
   * @param {string} n
   * @return {import("./result").Result<PokemonType, 'invalid'>}
   */
  static tryToPokemonType(n) {
    if (PokemonType.isValidType(n)) {
      return {
        status: "fulfilled",
        value: new PokemonType(n),
      };
    } else {
      return {
        status: "rejected",
        reason: "invalid",
      };
    }
  }

  /**
   *
   * @param {PokemonType} n
   * @returns {string}
   */
  static fromPokemonType(n) {
    return n.type;
  }

  /**
   * @private
   * @param {string} n
   * @returns {n is Type}
   */
  static isValidType = (n) => {
    /**
     * @type {Type[]}
     */
    const validTypes = ["Electric", "Fire"];
    return validTypes.some((t) => t === n);
  };
}
