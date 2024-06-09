import { FIGHTER } from "../models/fighter.js";
import { fighterRepository } from "../repositories/fighterRepository.js";


/**
 * Middleware function for validating a fighter entity during creation.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * 
 * @property {string} req.body.name - The name of the fighter. It is converted to lowercase.
 * @property {number} req.body.power - The power of the fighter. It must be a number between 1 and 100.
 * @property {number} req.body.defense - The defense of the fighter. It must be a number between 1 and 100.
 * 
 * @throws {string} "Content can not be empty!" - If the request body is empty.
 * @throws {string} "Required fields are missing!" - If the request body does not have all the required fields (name, power, defense).
 * @throws {string} "Fighter with the same name already exists!" - If a fighter with the same name already exists.
 * @throws {string} "Power must be a number between 1 and 100!" - If power is not a number between 1 and 100.
 * @throws {string} "Defense must be a number between 1 and 100!" - If defense is not a number between 1 and 100.
 */
const createFighterValid = (req, res, next) => {
  // DONE: Implement validatior for FIGHTER entity during creation 

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
  
  // Check if power is a number between 1 and 100
  if (req.body.power) {
    let power = parseInt(req.body.power, 10);
    if (power < 1 || req.body.power > 100) {
      req.error_message = "Power must be a number between 1 and 100!";
    }
  }

  // Check if defense is a number between 1 and 100
  if (req.body.defense) {
    if (req.body.defense < 1 || req.body.defense > 100) {
      req.error_message = "Defense must be a number between 1 and 100!";
    }
  }
  next();
};



/**
 * Middleware function for validating a fighter entity during update.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * 
 * @property {Object} req.body - The body of the request. It should not be empty.
 * @property {string} req.params.id - The ID of the fighter to update.
 * 
 * @throws {string} "Content can not be empty!" - If the request body is empty.
 * @throws {string} "Fighter not found!" - If the fighter with the provided ID does not exist.
 */
const updateFighterValid = (req, res, next) => {
  // DONE: Implement validatior for FIGHTER entity during update DONE!

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

/**
 * Function to validate if a fighter's name is unique.
 * 
 * @param {string} name - The name of the fighter.
 * 
 * @returns {boolean} - Returns false if a fighter with the same name exists, true otherwise.
 */
function isNameValid(name) {
  
  var fighter = fighterRepository.getOne({ name });
  if (fighter) {
    return false;
  }
  return true;
}
export { createFighterValid, updateFighterValid };
