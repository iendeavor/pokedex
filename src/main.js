import { createApp } from "./api/index.js";
import { SqlitePokemonRepo } from "./repo/sqlite-repo.js";
import { program } from "commander";
import { run } from "./cli/index.js";

function main() {
  program.option("--cli", "Run in CLI mode");
  program.parse();

  const repo = new SqlitePokemonRepo();
  if (program.opts().cli) {
    run(repo);
  } else {
    createApp(repo);
  }
}

main();
