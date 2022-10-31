import express from "express";
import bodyParser from "body-parser";
import { PokemonRepo } from "../domain/repo/pokemon-repo.js";
import { responseRoutes } from "./routes/index.js";

/**
 * @param {PokemonRepo} repo
 * @returns
 */
export const createApp = (repo) => {
  const app = express();
  const port = 8000;

  app.use(bodyParser.json());

  responseRoutes(app, repo);

  app.listen(port, () => {
    console.log(`Pokedex listening on port: ${port}`);
  });
};
