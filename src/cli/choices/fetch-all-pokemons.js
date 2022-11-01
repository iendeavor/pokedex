import { PokemonRepo } from "../../domain/repo/pokemon-repo.js";
import { execute } from "../../domain/usecase/fetch-all-pokemons.js";

/**
 * @param {PokemonRepo} repo
 */
export const fetchAllPokemons = async (repo) => {
  try {
    const result = execute({
      repo,
    });

    if (result.status === "rejected") {
      switch (result.reason) {
        case "Unknown":
        default:
          console.error("An unknown error occurred");
          return;
      }
    }

    result.value.forEach((pokemon) => {
      console.info(
        `Response { number: ${pokemon.number}, name: ${
          pokemon.name
        }, types: ${JSON.stringify(pokemon.types)} }`
      );
    });
  } catch (error) {
    console.error("An error occurred during the prompt");
  }
};
