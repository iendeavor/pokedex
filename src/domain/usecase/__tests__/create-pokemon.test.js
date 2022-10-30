import { InMemoryPokemonRepo } from "../../../repo/in-memory-repo.js";
import { Pokemon } from "../../entity/pokemon.js";
import { PokemonName } from "../../entity/pokemon-name.js";
import { PokemonNumber } from "../../entity/pokemon-number.js";
import { PokemonTypes } from "../../entity/pokemon-types.js";
import { unwrap } from "../../entity/result.js";
import { execute } from "../create-pokemon.js";

test("it should return a bad request error when request is invalid", () => {
  const req = {
    repo: new InMemoryPokemonRepo(),
    number: 25,
    name: "",
    types: ["Electric"],
  };

  const res = execute(req);

  expect(res).toEqual({ status: "rejected", reason: "BadRequest" });
});

test("it should return a conflict error when pokemon number already exists", () => {
  const repo = new InMemoryPokemonRepo();
  repo.insert(
    new Pokemon({
      pokemonNumber: unwrap(PokemonNumber.tryToPokemonNumber(25)),
      pokemonName: unwrap(PokemonName.tryToPokemonName("Charmander")),
      pokemonTypes: unwrap(PokemonTypes.tryToPokemonTypes(["Fire"])),
    })
  );
  const req = {
    repo,
    number: 25,
    name: "Pikachu",
    types: ["Electric"],
  };

  const res = execute(req);

  expect(res).toEqual({ status: "rejected", reason: "Conflict" });
});

test("it should return a unknown error when an unexpected error happens", () => {
  const repo = new InMemoryPokemonRepo();
  repo.withError();
  const req = {
    repo,
    number: 25,
    name: "Pikachu",
    types: ["Electric"],
  };

  const res = execute(req);

  expect(res).toEqual({ status: "rejected", reason: "Unknown" });
});

test("it should return the pokemon number otherwise", () => {
  const number = 25;
  const req = {
    repo: new InMemoryPokemonRepo(),
    number,
    name: "Pikachu",
    types: ["Electric"],
  };

  const res = execute(req);

  expect(res).toEqual({ status: "fulfilled", value: number });
});
