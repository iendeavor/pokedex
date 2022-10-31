import express from "express";

/**
 * @param {express.Express} app
 */
export const responseRouteNotFound = (app) => {
  app.all("*", (req, res) => {
    res.sendStatus(404);
  });
};
