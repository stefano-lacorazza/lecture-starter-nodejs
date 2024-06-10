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
router.post("/", createFighterValid, responseMiddleware, async (req, res, next) => {
  if (!req.error_message) {
    const fighter = await fighterService.createFighter(req.body);
    res.json(fighter);
  } 
});

// GET route for retrieving a fighter by ID
router.get("/:id", updateFighterValid, responseMiddleware, async (req, res, next) => {
  if (!req.error_message) {
    const fighter = await fighterService.getFighterById(req.params.id);
    //Turn first letter of thefighters name to uppercase
    fighter.name = fighter.name.charAt(0).toUpperCase() + fighter.name.slice(1);
    res.json(fighter);
  } 
});

// PATCH route for updating a fighter
router.patch("/:id", updateFighterValid, responseMiddleware, async (req, res, next) => {
  if (!req.error_message) {
    const fighter = await fighterService.updateFighter(req.params.id, req.body);
    res.json(fighter);
  } 
});

// DELETE route for deleting a fighter
router.delete("/:id", updateFighterValid, responseMiddleware, async (req, res, next) => {
  if (!req.error_message) {
    await fighterService.deleteFighter(req.params.id);
    res.json({ message: "Fighter deleted successfully" });
  } 
});


export { router };
