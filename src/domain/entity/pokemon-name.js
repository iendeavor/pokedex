export class PokemonName {
  /**
   * @private
   * @type {string}
   */
  name;

  /**
   * @private
   * @param {string} n
   */
  constructor(n) {
    this.name = n;
  }

  /**
   * @param {string} n
   * @return {import("./result").Result<PokemonName, 'invalid'>}
   */
  static tryToPokemonName(n) {
    if (typeof n === "string" && n.trim()) {
      return {
        status: "fulfilled",
        value: new PokemonName(n),
      };
    } else {
      return {
        status: "rejected",
        reason: "invalid",
      };
    }
  }
}
