import express from "express";
import { PokemonRepo } from "../../domain/repo/pokemon-repo.js";
import { execute } from "../../domain/usecase/delete-pokemon.js";

/**
 * @param {express.Express} app
 * @param {PokemonRepo} repo
 */
export const responseRouteDeletePokemon = (app, repo) => {
  app.delete("/:pokemonId", (req, res) => {
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

    res.sendStatus(204);
  });
};
