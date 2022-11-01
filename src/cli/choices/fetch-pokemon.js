import { PokemonRepo } from "../../domain/repo/pokemon-repo.js";
import { execute } from "../../domain/usecase/fetch-pokemon.js";
import { promptNumber } from "../prompt.js";

/**
 * @param {PokemonRepo} repo
 */
export const fetchPokemon = async (repo) => {
  try {
    const number = await promptNumber();
    const result = execute({
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

    console.info(
      `Response { number: ${result.value.number}, name: ${
        result.value.name
      }, types: ${JSON.stringify(result.value.types)} }`
    );
  } catch (error) {
    console.error("An error occurred during the prompt");
  }
};
