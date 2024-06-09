import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter DONE!

// GET route for retrieving all fighters
router.get("/", async (req, res, next) => {
  if (!req.error_message) {
    const fighters = await fighterService.getAllFighters();
    res.json(fighters);
  } 
});

// POST route for creating a new fighter
router.post("/", createFighterValid, async (req, res, next) => {
  if (!req.error_message) {
    const fighter = await fighterService.createFighter(req.body);
    res.json(fighter);
  } 
});

// GET route for retrieving a fighter by ID
router.get("/:id", async (req, res, next) => {
  if (!req.error_message) {
    const fighter = await fighterService.getFighterById(req.params.id);
    res.json(fighter);
  } 
});

// PATCH route for updating a fighter
router.patch("/:id", updateFighterValid, async (req, res, next) => {
  if (!req.error_message) {
    const fighter = await fighterService.updateFighter(req.params.id, req.body);
    res.json(fighter);
  } 
});

// DELETE route for deleting a fighter
router.delete("/:id", async (req, res, next) => {
  if (!req.error_message) {
    await fighterService.deleteFighter(req.params.id);
    res.json({ message: "Fighter deleted successfully" });
  } 
});


export { router };
