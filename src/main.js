import { createApp } from "./api/index.js";
import { InMemoryPokemonRepo } from "./repo/in-memory-repo.js";

function main() {
  const repo = new InMemoryPokemonRepo();
  createApp(repo);
}

main();
