import { InMemoryPokemonRepo } from "../../../repo/in-memory-repo.js";
import { Pokemon } from "../../entity/pokemon.js";
import { PokemonName } from "../../entity/pokemon-name.js";
import { PokemonNumber } from "../../entity/pokemon-number.js";
import { PokemonTypes } from "../../entity/pokemon-types.js";
import { unwrap } from "../../entity/result.js";
import { execute } from "../create-pokemon.js";
import { PokemonRepo } from "../../repo/pokemon-repo.js";

test("it should return a bad request error when request is invalid", async () => {
  const repo = new InMemoryPokemonRepo();
  const req = createReq({
    repo,
    number: PokemonNumber["pikachu"](),
    name: PokemonName["bad"](),
    types: PokemonTypes["pikachu"](),
  });

  const res = await execute(req);

  expect(res).toEqual({ status: "rejected", reason: "BadRequest" });
});

test("it should return a conflict error when pokemon number already exists", async () => {
  const repo = new InMemoryPokemonRepo();
  repo.insert(
    new Pokemon({
      pokemonNumber: PokemonNumber["pikachu"](),
      pokemonName: PokemonName["pikachu"](),
      pokemonTypes: PokemonTypes["pikachu"](),
    })
  );
  const req = createReq({
    repo,
    number: PokemonNumber["pikachu"](),
    name: PokemonName["charmander"](),
    types: PokemonTypes["charmander"](),
  });

  const res = await execute(req);

  expect(res).toEqual({ status: "rejected", reason: "Conflict" });
});

test("it should return a unknown error when an unexpected error happens", async () => {
  const repo = new InMemoryPokemonRepo();
  repo["withError"]();
  const req = createReq({
    repo,
    number: PokemonNumber["pikachu"](),
    name: PokemonName["pikachu"](),
    types: PokemonTypes["pikachu"](),
  });

  const res = await execute(req);

  expect(res).toEqual({ status: "rejected", reason: "Unknown" });
});

test("it should return the pokemon number otherwise", async () => {
  const repo = new InMemoryPokemonRepo();
  const req = createReq({
    repo,
    number: PokemonNumber["pikachu"](),
    name: PokemonName["pikachu"](),
    types: PokemonTypes["pikachu"](),
  });

  const res = await execute(req);

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
 * @param {PokemonName} param0.name
 * @param {PokemonTypes} param0.types
 * @returns {{ repo: PokemonRepo, number: number; name: string, types: string[] }}
 */
const createReq = ({ repo, number, name, types }) => {
  return {
    repo,
    number: PokemonNumber.fromPokemonNumber(number),
    name: PokemonName.fromPokemonName(name),
    types: PokemonTypes.fromPokemonTypes(types),
  };
};
