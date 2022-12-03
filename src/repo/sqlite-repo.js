// @ts-ignore
import { PrismaClient, Prisma } from "@prisma/client";
import { Pokemon } from "../domain/entity/pokemon.js";
import { PokemonName } from "../domain/entity/pokemon-name.js";
import { PokemonNumber } from "../domain/entity/pokemon-number.js";
import { PokemonTypes } from "../domain/entity/pokemon-types.js";
import { PokemonRepo } from "../domain/repo/pokemon-repo.js";
import { unwrap } from "../domain/entity/result.js";

export class SqlitePokemonRepo extends PokemonRepo {
  constructor() {
    super();
  }

  /**
   * @param {Pokemon} pokemon
   * @returns {import("../domain/repo/pokemon-repo").InsertResult}
   */
  async insert(pokemon) {
    const result = await this.hasExists(
      PokemonNumber.fromPokemonNumber(pokemon.number)
    );
    if (result.status === "fulfilled" && result.value) {
      return {
        status: "rejected",
        reason: "Conflict",
      };
    } else if (result.status === "rejected") {
      return {
        status: "rejected",
        reason: "Unknown",
      };
    }

    const prisma = new PrismaClient();
    try {
      /**
       * @type {{ number: number; name: string; types: { name: string }[] }}
       */
      const pokemonResult = await prisma.pokemon.create({
        data: {
          number: PokemonNumber.fromPokemonNumber(pokemon.number),
          name: PokemonName.fromPokemonName(pokemon.name),
          types: {
            create: PokemonTypes.fromPokemonTypes(pokemon.types).map(
              (type) => ({
                name: type,
              })
            ),
          },
        },
        include: { types: true },
      });

      return {
        status: "fulfilled",
        value: new Pokemon({
          pokemonNumber: unwrap(
            PokemonNumber.tryToPokemonNumber(pokemonResult.number)
          ),
          pokemonName: unwrap(PokemonName.tryToPokemonName(pokemonResult.name)),
          pokemonTypes: unwrap(
            PokemonTypes.tryToPokemonTypes(
              pokemonResult.types.map((type) => type.name)
            )
          ),
        }),
      };
    } catch (error) {
      console.error(error);
      return {
        status: "rejected",
        reason: "Unknown",
      };
    } finally {
      await prisma.$disconnect();
    }
  }

  /**
   * @private
   * @param {number} number
   * @returns {Promise<import("../domain/entity/result.js").Result<boolean, 'Unknown'>>}
   */
  async hasExists(number) {
    const prisma = new PrismaClient();
    try {
      await prisma.pokemon.findFirstOrThrow({
        where: { number },
        include: { types: true },
      });
      return {
        status: "fulfilled",
        value: true,
      };
    } catch (error) {
      if (error instanceof Prisma.NotFoundError) {
        return {
          status: "fulfilled",
          value: false,
        };
      } else {
        console.error(error);
        return {
          status: "rejected",
          reason: "Unknown",
        };
      }
    }
  }

  /**
   * @returns {import("../domain/repo/pokemon-repo.js").FetchAllResult}
   */
  async fetchAll() {
    const prisma = new PrismaClient();
    try {
      /**
       * @type {{ number: number; name: string; types: { name: string }[] }[]}
       */
      const pokemons = await prisma.pokemon.findMany({
        orderBy: [{ number: "asc" }],
        include: { types: true },
      });
      return {
        status: "fulfilled",
        value: pokemons.map((pokemon) => {
          return new Pokemon({
            pokemonNumber: unwrap(
              PokemonNumber.tryToPokemonNumber(pokemon.number)
            ),
            pokemonName: unwrap(PokemonName.tryToPokemonName(pokemon.name)),
            pokemonTypes: unwrap(
              PokemonTypes.tryToPokemonTypes(
                pokemon.types.map((type) => type.name)
              )
            ),
          });
        }),
      };
    } catch (error) {
      console.error(error);
      return {
        status: "rejected",
        reason: "Unknown",
      };
    } finally {
      await prisma.$disconnect();
    }
  }

  /**
   * @param {number} number
   * @returns {import("../domain/repo/pokemon-repo.js").FetchResult}
   */
  async fetch(number) {
    const prisma = new PrismaClient();
    try {
      /**
       * @type {{ number: number; name: string; types: { name: string }[] }}
       */
      const pokemon = await prisma.pokemon.findFirstOrThrow({
        where: { number },
        include: { types: true },
      });
      return {
        status: "fulfilled",
        value: new Pokemon({
          pokemonNumber: unwrap(
            PokemonNumber.tryToPokemonNumber(pokemon.number)
          ),
          pokemonName: unwrap(PokemonName.tryToPokemonName(pokemon.name)),
          pokemonTypes: unwrap(
            PokemonTypes.tryToPokemonTypes(
              pokemon.types.map((type) => type.name)
            )
          ),
        }),
      };
    } catch (error) {
      if (error instanceof Prisma.NotFoundError) {
        return {
          status: "rejected",
          reason: "NotFound",
        };
      } else {
        console.error(error);
        return {
          status: "rejected",
          reason: "Unknown",
        };
      }
    } finally {
      await prisma.$disconnect();
    }
  }

  /**
   * @param {number} number
   * @returns {import("../domain/repo/pokemon-repo.js").DeleteResult}
   */
  async delete(number) {
    const result = await this.hasExists(number);
    if (result.status === "fulfilled" && result.value === false) {
      return {
        status: "rejected",
        reason: "NotFound",
      };
    } else if (result.status === "rejected") {
      return {
        status: "rejected",
        reason: "Unknown",
      };
    }

    const prisma = new PrismaClient();
    try {
      await prisma.type.deleteMany({
        where: { pokemonId: number },
      });
      await prisma.pokemon.delete({
        where: { number },
      });
      return {
        status: "fulfilled",
        value: undefined,
      };
    } catch (error) {
      console.error(error);
      return {
        status: "rejected",
        reason: "Unknown",
      };
    } finally {
      await prisma.$disconnect();
    }
  }
}
