import { execute } from "../create-pokemon.js";

test("it should return a bad request error when request is invalid", () => {
  const req = {
    number: 25,
    name: "",
    types: ["Electric"],
  };

  const res = execute(req);

  expect(res).toEqual({ status: "rejected", reason: "BadRequest" });
});

test("it should return the pokemon number otherwise", () => {
  const number = 25;
  const req = {
    number,
    name: "Pikachu",
    types: ["Electric"],
  };

  const res = execute(req);

  expect(res).toEqual({ status: "fulfilled", value: number });
});
