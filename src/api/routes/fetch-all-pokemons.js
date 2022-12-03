import express from "express";
import { PokemonRepo } from "../../domain/repo/pokemon-repo.js";
import { execute } from "../../domain/usecase/fetch-all-pokemons.js";

/**
 * @param {express.Express} app
 * @param {PokemonRepo} repo
 */
export const responseRouteFetchAllPokemons = (app, repo) => {
  app.get("/", async (req, res) => {
    const result = await execute({
      repo,
    });

    if (result.status === "rejected") {
      switch (result.reason) {
        case "Unknown":
        default:
          res.sendStatus(500);
          return;
      }
    }

    res.status(200).json(
      result.value.map((pokemon) => {
        return {
          number: pokemon.number,
          name: pokemon.name,
          types: pokemon.types,
        };
      })
    );
  });
};
