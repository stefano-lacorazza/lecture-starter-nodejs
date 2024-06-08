import { FIGHTER } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation

  // Check if the request body is empty
  if (!req.body) {
    res.status(400).send({  error: true, message: "Content can not be empty!" });
    return;
  }
  // Check if the request body has all the required fields
  if (!req.body.name || !req.body.power || !req.body.defense) {
    res.status(400).send({  error: true, message: "Required fields are missing!" });
    return;
  }
  //Check if a fighter with the same name already exists
  if (FIGHTER.find((fighter) => fighter.name === req.body.name)) {
    res.status(400).send({  error: true, message: "Fighter with the same name already exists!" });
    return;
  }


  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update

  // Check if the request body is empty
  if (!req.body) {
    res.status(400).send({  error: true, message: "Content can not be empty!" });
    return;
  }
  next();
};

export { createFighterValid, updateFighterValid };
