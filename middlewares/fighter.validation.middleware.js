import { FIGHTER } from "../models/fighter.js";
import { fighterRepository } from "../repositories/fighterRepository.js";

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation

  // Convert the name to lowercase
  if (req.body.name) {
    req.body.name = req.body.name.toLowerCase();
  }


  // Check if the request body is empty
  if (!req.body) {
    req.error_message = "Content can not be empty!";

  }
  // Check if the request body has all the required fields
  if (!req.body.name || !req.body.power || !req.body.defense) {
    req.error_message = "Required fields are missing!";

  }
  //Check if a fighter with the same name already exists
  if (!isNameValid(req.body.name)) {
    req.error_message = "Fighter with the same name already exists!";
  }
  
  // Checkif power is a number between 1 and 100
  if (req.body.power) {
    let power = parseInt(req.body.power, 10);
    if (power < 1 || req.body.power > 100) {
      req.error_message = "Power must be a number between 1 and 100!";
    }
  }

  // Checkif defense is a number between 1 and 100
  if (req.body.defense) {
    if (req.body.defense < 1 || req.body.defense > 100) {
      req.error_message = "Defense must be a number between 1 and 100!";
    }
  }
  next();
};




const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update DONE!

  // Check if the request body is empty
  if (!req.body) {
    req.error_message = "Content can not be empty!";
    
   
  }
  // Check if the requested fighter exists
const fighter = fighterRepository.getOne({ id: req.params.id });
  if (!fighter) {
    req.error_message = "Fighter not found!";
  }


  next();
};


function isNameValid(name) {
  
  var fighter = fighterRepository.getOne({ name });
  if (fighter) {
    return false;
  }
  return true;
}
export { createFighterValid, updateFighterValid };
