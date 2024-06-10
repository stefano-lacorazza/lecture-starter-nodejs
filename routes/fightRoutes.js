import { Router } from "express";
import { fightService } from "../services/fightService.js";
import { fightRepository } from "../repositories/fightRepository.js";

import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();


// OPTIONAL TODO: Implement route controller for fights

// GET route for retrieving all fights
router.get("/", async (req, res, next) => {
  if (!req.error_message) {
    const fights = await fightService.getAllFights();
    res.json(fights);
  }
});

// POST route for creating a new fight
router.post("/", async (req, res, next) => {
  if (!req.error_message) {
    const fight = await fightService.createFight(req.body);
    res.json(fight);
  }
});

// GET route for retrieving a fight by ID
router.get("/:id", async (req, res, next) => {
  if (!req.error_message) {
    const fight = await fightService.getFight(req.params.id);
    res.json(fight);
  }
});

// PATCH route for updating a fight
router.patch("/:id", async (req, res, next) => {
  if (!req.error_message) {
    const fight = await fightService.updateFight(req.params.id, req.body);
    res.json(fight);
  }
});

// DELETE route for deleting a fight
router.delete("/:id", async (req, res, next) => {
  if (!req.error_message) {
    await fightService.deleteFight(req.params.id);
    res.json({ message: "Fight deleted successfully" });
  }
});



export { router };
