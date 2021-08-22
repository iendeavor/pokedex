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
   * @return {Result<PokemonTypes, 'invalid'>}
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
}

/**
 * @typedef {'Electric'} Type
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
   * @return {Result<PokemonType, 'invalid'>}
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
   * @private
   * @param {string} n
   * @returns {n is Type}
   */
  static isValidType = (n) => {
    /**
     * @type {Type[]}
     */
    const validTypes = ["Electric"];
    return validTypes.some((t) => t === n);
  };
}
