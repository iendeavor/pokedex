import inquirer from "inquirer";
import { PokemonRepo } from "../domain/repo/pokemon-repo.js";
import { createPokemon } from "./choices/create-pokemon.js";
import { deletePokemon } from "./choices/delete-pokemon.js";
import { fetchAllPokemons } from "./choices/fetch-all-pokemons.js";
import { fetchPokemon } from "./choices/fetch-pokemon.js";

/**
 * @param {PokemonRepo} repo
 */
export const run = async (repo) => {
  const choices = [
    "Fetch all Pokemons",
    "Fetch a Pokemon",
    "Create a Pokemon",
    "Delete a Pokemon",
    "Exit",
  ];

  while (true) {
    try {
      const answers = await inquirer.prompt([
        {
          name: "Make your choices",
          type: "list",
          choices,
        },
      ]);

      switch (answers["Make your choices"]) {
        case "Fetch all Pokemons":
          await fetchAllPokemons(repo);
          break;
        case "Fetch a Pokemon":
          await fetchPokemon(repo);
          break;
        case "Create a Pokemon":
          await createPokemon(repo);
          break;
        case "Delete a Pokemon":
          await deletePokemon(repo);
          break;
        case "Exit":
          process.exit(0);
        default:
          throw Error("Unexpected error");
      }

      console.log("");
    } catch (error) {
      console.error(error);
    }
  }
};
