import { USER } from "../models/user.js";
import { userRepository } from "../repositories/userRepository.js";
const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation

  // Check if the request body is empty
  if (!req.body) {

    req.error_message = "Content can not be empty!"
    next();
  }
  // Check if the request body has all the required fields
  if (!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName || !req.body.phoneNumber ) {
   req.error_message = "Required fields are missing!"
   next();
  }
  // Check if the email is valid
  if (req.body.email && !req.body.email.includes("@gmail.com")) {
    req.error_message = "Invalid email!"
    next();
  }
  // Check if the password is valid
  if (req.body.password) {
    if (req.body.password.length < 3)
      {
        req.error_message = "Password must be at least 3 characters!"
        next();
      }
   
  }
  // CHeck if the phone number starts with +380 and has 13 characters
  if (req.body.phoneNumber ) {
    if (!req.body.phoneNumber.startsWith("+380") || req.body.phoneNumber.length !== 13) {
      req.error_message = "Phone number must have 13 characters and start with +380!"
      next();
    }
  
    next();
  }
  // Check if the user with the same email already exists

  let users = userRepository.getAll();
  if (users.find((user) => user.email === req.params.email)) {
    req.error_message = "User with the same email already exists!";
  }
/*
  if (!isEmailValid(req.body.email)) {
    req.error_message = "User with the same email already exists!"
    next();
  }
    */
  //Check if the user with the same phone number already exists
  
  if (users.find((user) => user.phoneNumber === req.params.phoneNumber)) {
    req.error_message = "User with the same phone number already exists!";
  }
  /*
  if (!isPhoneNumberValid(req.body.phoneNumber)) {
    req.error_message = "User with the same phone number already exists!"
    next();
  }
    */

  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update DONE!

  // Check if the request body is empty
  if (!req.body) {
    req.error_message = "Content can not be empty!";

  }
  // Check if the requested user exists
  let users = userRepository.getAll();
  if (!users.find((user) => user.id === req.params.id)) {
    req.error_message = "User not found!";
  }
 
    
  next();
};

function isEmailValid(email) {
let users = userRepository.getAll();
  if (users.find((user) => user.email === email)) {
    return false;
  }
  return true;
}

function isPhoneNumberValid(phoneNumber) {
  let users = userRepository.getAll();
  if (users.find((user) => user.phoneNumber === phoneNumber)) {
    return false;
  }
  return true;
}
  


export { createUserValid, updateUserValid };
