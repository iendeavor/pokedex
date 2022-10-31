import express from "express";
import { PokemonRepo } from "../../domain/repo/pokemon-repo.js";
import { responseRouteCreatePokemon } from "./create-pokemon.js";
import { responseRouteHealth } from "./health.js";
import { responseRouteNotFound } from "./not-found.js";

/**
 * @param {express.Express} app
 * @param {PokemonRepo} repo
 */
export const responseRoutes = (app, repo) => {
  responseRouteHealth(app);
  responseRouteCreatePokemon(app, repo);
  responseRouteNotFound(app);
};
