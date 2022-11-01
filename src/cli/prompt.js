import inquirer from "inquirer";

export const promptNumber = async () => {
  return inquirer
    .prompt([
      {
        name: "Pokemon number",
        type: "number",
      },
    ])
    .then((answers) => {
      return answers["Pokemon number"];
    });
};

export const promptName = async () => {
  return inquirer
    .prompt([
      {
        name: "Pokemon name",
        type: "input",
      },
    ])
    .then((answers) => {
      return answers["Pokemon name"];
    });
};

export const promptTypes = async () => {
  return inquirer
    .prompt([
      {
        name: "Pokemon types",
        type: "checkbox",
        choices: ["Electric", "Fire"],
      },
    ])
    .then((answers) => {
      return answers["Pokemon types"];
    });
};
