import { FIGHTER } from "../models/fighter.js";
import { fighterRepository } from "../repositories/fighterRepository.js";

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation

  // Check if the request body is empty
  if (!req.body) {
    req.error_message = "Content can not be empty!";

    next();
  }
  // Check if the request body has all the required fields
  if (!req.body.name || !req.body.power || !req.body.defense) {
    req.error_message = "Required fields are missing!";

    next();
  }
  //Check if a fighter with the same name already exists
  if (FIGHTER.find((fighter) => fighter.name === req.body.name)) {
    req.error_message = "Fighter with the same name already exists!";

    next();
  }


  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update

  // Check if the request body is empty
  if (!req.body) {
    req.error_message = "Content can not be empty!";
    
    next();
  }
  // Check if the requested fighter exists
  const fighter = fighterRepository.getOne(req.params.id);
  if (!fighter) {
    req.error_message = "Fighter not found!";
    
    next();
  }
  next();
};

export { createFighterValid, updateFighterValid };
