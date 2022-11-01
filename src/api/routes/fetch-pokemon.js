import express from "express";
import { PokemonRepo } from "../../domain/repo/pokemon-repo.js";
import { execute } from "../../domain/usecase/fetch-pokemon.js";

/**
 * @param {express.Express} app
 * @param {PokemonRepo} repo
 */
export const responseRouteFetchPokemon = (app, repo) => {
  app.get("/:pokemonId", (req, res) => {
    const result = execute({
      repo,
      number: parseInt(req.params.pokemonId, 10),
    });

    if (result.status === "rejected") {
      switch (result.reason) {
        case "BadRequest":
          res.sendStatus(400);
          return;
        case "NotFound":
          res.sendStatus(404);
          return;
        case "Unknown":
        default:
          res.sendStatus(500);
          return;
      }
    }

    res.status(200).json({
      number: result.value.number,
      name: result.value.name,
      types: result.value.types,
    });
  });
};
