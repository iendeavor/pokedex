import express from "express";

/**
 * @param {express.Express} app
 */
export const responseRouteHealth = (app) => {
  app.get("/health", (req, res) => {
    res.json({
      message: "Gotta catch them all!",
    });
  });
};
