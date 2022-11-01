import express from "express";
import { PokemonRepo } from "../../domain/repo/pokemon-repo.js";
import { responseRouteCreatePokemon } from "./create-pokemon.js";
import { responseRouteDeletePokemon } from "./delete-pokemon.js";
import { responseRouteFetchAllPokemons } from "./fetch-all-pokemons.js";
import { responseRouteFetchPokemon } from "./fetch-pokemon.js";
import { responseRouteHealth } from "./health.js";
import { responseRouteNotFound } from "./not-found.js";

/**
 * @param {express.Express} app
 * @param {PokemonRepo} repo
 */
export const responseRoutes = (app, repo) => {
  responseRouteHealth(app);
  responseRouteCreatePokemon(app, repo);
  responseRouteFetchAllPokemons(app, repo);
  responseRouteFetchPokemon(app, repo);
  responseRouteDeletePokemon(app, repo);
  responseRouteNotFound(app);
};
