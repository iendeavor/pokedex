const { InMemoryPokemonRepo } = require("../../../repo/in-memory-repo.js");
const { PokemonName } = require("../../entity/pokemon-name.js");
const { PokemonNumber } = require("../../entity/pokemon-number.js");
const { PokemonTypes } = require("../../entity/pokemon-types.js");
const { Pokemon } = require("../../entity/pokemon.js");
const { execute } = require("../fetch-all-pokemons.js");

test("it should return and unknown error when an unexpected error happens", () => {
  const repo = new InMemoryPokemonRepo();
  repo["withError"]();

  const res = execute({ repo });

  expect(res).toEqual({ status: "rejected", reason: "Unknown" });
});

test("it should return all pokemons ordered by increasing number otherwise", () => {
  const repo = new InMemoryPokemonRepo();
  repo.insert(
    new Pokemon({
      pokemonNumber: PokemonNumber["pikachu"](),
      pokemonName: PokemonName["pikachu"](),
      pokemonTypes: PokemonTypes["pikachu"](),
    })
  );
  repo.insert(
    new Pokemon({
      pokemonNumber: PokemonNumber["charmander"](),
      pokemonName: PokemonName["charmander"](),
      pokemonTypes: PokemonTypes["charmander"](),
    })
  );

  const res = execute({ repo });

  expect(res).toEqual({
    status: "fulfilled",
    value: [
      {
        number: PokemonNumber.fromPokemonNumber(PokemonNumber["charmander"]()),
        name: PokemonName.fromPokemonName(PokemonName["charmander"]()),
        types: PokemonTypes.fromPokemonTypes(PokemonTypes["charmander"]()),
      },
      {
        number: PokemonNumber.fromPokemonNumber(PokemonNumber["pikachu"]()),
        name: PokemonName.fromPokemonName(PokemonName["pikachu"]()),
        types: PokemonTypes.fromPokemonTypes(PokemonTypes["pikachu"]()),
      },
    ],
  });
});
