import { unwrap } from "./result.js";

export class PokemonNumber {
  /**
   * @private
   * @type {number}
   */
  number;

  /**
   * @private
   * @param {number} n
   */
  constructor(n) {
    this.number = n;
  }

  /**
   * @param {number} n
   * @return {import("./result").Result<PokemonNumber, 'invalid'>}
   */
  static tryToPokemonNumber(n) {
    if (typeof n === "number" && n > 0 && n < 899) {
      return {
        status: "fulfilled",
        value: new PokemonNumber(n),
      };
    } else {
      return {
        status: "rejected",
        reason: "invalid",
      };
    }
  }

  /**
   * @param {PokemonNumber} n
   * @returns {number}
   */
  static fromPokemonNumber(n) {
    return n.number;
  }

  /**
   * @private
   * @returns {PokemonNumber}
   */
  static pikachu() {
    return new PokemonNumber(25);
  }

  /**
   * @private
   * @returns {PokemonNumber}
   */
  static charmander() {
    return new PokemonNumber(4);
  }

  /**
   * @private
   * @returns {PokemonNumber}
   */
  static bad() {
    return new PokemonNumber(0);
  }
}
