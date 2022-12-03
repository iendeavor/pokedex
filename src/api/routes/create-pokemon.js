import express from "express";
import { PokemonRepo } from "../../domain/repo/pokemon-repo.js";
import { execute } from "../../domain/usecase/create-pokemon.js";

/**
 * @param {express.Express} app
 * @param {PokemonRepo} repo
 */
export const responseRouteCreatePokemon = (app, repo) => {
  app.post("/", async (req, res) => {
    const result = await execute({
      repo,
      number: req.body.number,
      name: req.body.name,
      types: req.body.types,
    });

    if (result.status === "rejected") {
      switch (result.reason) {
        case "BadRequest":
          res.sendStatus(400);
          return;
        case "Conflict":
          res.sendStatus(409);
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
