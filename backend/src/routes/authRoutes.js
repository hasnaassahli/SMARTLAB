// routes/autoRoutes.js
const express = require("express");

/**
 * Crée un routeur Express CRUD pour un controller donné.
 * @param {object} controller - controller CRUD (getAll, getById, create, update, delete)
 */
function createAutoRouter(controller) {
  const router = express.Router();

  router.get("/", controller.getAll);
  router.get("/:id", controller.getById);
  router.post("/", controller.create);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.delete);

  return router;
}

module.exports = createAutoRouter;
