import { PokemonName } from "./pokemon-name.js";
import { PokemonNumber } from "./pokemon-number.js";
import { PokemonTypes } from "./pokemon-types.js";

export class Pokemon {
  /**
   * @readonly
   * @type {PokemonNumber}
   */
  number;

  /**
   * @private
   * @type {PokemonName}
   */
  name;

  /**
   * @private
   * @type {PokemonTypes}
   */
  types;

  /**
   * @param {{ pokemonNumber: PokemonNumber; pokemonName: PokemonName; pokemonTypes: PokemonTypes}} param0
   */
  constructor({ pokemonNumber, pokemonName, pokemonTypes }) {
    this.number = pokemonNumber;
    this.name = pokemonName;
    this.types = pokemonTypes;
  }
}
