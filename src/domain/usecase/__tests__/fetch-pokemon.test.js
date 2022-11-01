const { InMemoryPokemonRepo } = require("../../../repo/in-memory-repo.js");
const { PokemonName } = require("../../entity/pokemon-name.js");
const { PokemonNumber } = require("../../entity/pokemon-number.js");
const { PokemonTypes } = require("../../entity/pokemon-types.js");
const { Pokemon } = require("../../entity/pokemon.js");
const { PokemonRepo } = require("../../repo/pokemon-repo.js");
const { execute } = require("../fetch-pokemon.js");

test("it should return an unknown error when an unexpected error happens", () => {
  const repo = new InMemoryPokemonRepo();
  repo["withError"]();

  const res = execute(createReq({ repo, number: PokemonNumber["pikachu"]() }));

  expect(res).toEqual({ status: "rejected", reason: "Unknown" });
});

test("it should return a bad request when request is invalid", () => {
  const repo = new InMemoryPokemonRepo();

  const res = execute(createReq({ repo, number: PokemonNumber["bad"]() }));

  expect(res).toEqual({ status: "rejected", reason: "BadRequest" });
});

test("it should return a not found error when the repo does not contain the pokemon", () => {
  const repo = new InMemoryPokemonRepo();

  const res = execute(createReq({ repo, number: PokemonNumber["pikachu"]() }));

  expect(res).toEqual({ status: "rejected", reason: "NotFound" });
});

test("it should return the pokemon otherwise", () => {
  const repo = new InMemoryPokemonRepo();
  repo.insert(
    new Pokemon({
      pokemonNumber: PokemonNumber["pikachu"](),
      pokemonName: PokemonName["pikachu"](),
      pokemonTypes: PokemonTypes["pikachu"](),
    })
  );

  const res = execute(createReq({ repo, number: PokemonNumber["pikachu"]() }));

  expect(res).toEqual({
    status: "fulfilled",
    value: {
      number: PokemonNumber.fromPokemonNumber(PokemonNumber["pikachu"]()),
      name: PokemonName.fromPokemonName(PokemonName["pikachu"]()),
      types: PokemonTypes.fromPokemonTypes(PokemonTypes["pikachu"]()),
    },
  });
});

/**
 *
 * @param {object} param0
 * @param {PokemonRepo} param0.repo
 * @param {PokemonNumber} param0.number
 * @returns {{ repo: PokemonRepo, number: number; }}
 */
const createReq = ({ repo, number }) => {
  return {
    repo,
    number: PokemonNumber.fromPokemonNumber(number),
  };
};
