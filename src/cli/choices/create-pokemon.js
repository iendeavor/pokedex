import { PokemonRepo } from "../../domain/repo/pokemon-repo.js";
import { execute } from "../../domain/usecase/create-pokemon.js";
import { promptName, promptNumber, promptTypes } from "../prompt.js";

/**
 * @param {PokemonRepo} repo
 */
export const createPokemon = async (repo) => {
  try {
    const number = await promptNumber();
    const name = await promptName();
    const types = await promptTypes();
    const result = await execute({
      repo,
      number,
      name,
      types,
    });

    if (result.status === "rejected") {
      switch (result.reason) {
        case "BadRequest":
          console.error("The request is invalid");
          return;
        case "Conflict":
          console.error("The pokemon already exists");
          return;
        case "Unknown":
        default:
          console.error("An unknown error occurred");
          return;
      }
    }

    console.info(
      `Response { number: ${result.value.number}, name: ${
        result.value.name
      }, types: ${JSON.stringify(result.value.types)} }`
    );
  } catch (error) {
    console.error("An error occurred during the prompt");
  }
};
