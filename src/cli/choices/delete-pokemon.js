import { PokemonRepo } from "../../domain/repo/pokemon-repo.js";
import { execute } from "../../domain/usecase/delete-pokemon.js";
import { promptNumber } from "../prompt.js";

/**
 * @param {PokemonRepo} repo
 */
export const deletePokemon = async (repo) => {
  try {
    const number = await promptNumber();
    const result = await execute({
      repo,
      number,
    });

    if (result.status === "rejected") {
      switch (result.reason) {
        case "BadRequest":
          console.error("The request is invalid");
          return;
        case "NotFound":
          console.error("The pokemon does not exist");
          return;
        case "Unknown":
        default:
          console.error("An unknown error occurred");
          return;
      }
    }

    console.info(`The pokemon has been deleted`);
  } catch (error) {
    console.error("An error occurred during the prompt");
  }
};
