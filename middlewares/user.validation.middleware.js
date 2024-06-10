import { USER } from "../models/user.js";
import { userRepository } from "../repositories/userRepository.js";


/**
 * Middleware function for validating a user entity during creation.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * 
 * @property {string} req.body.email - The email of the user. It is converted to lowercase and must be a valid Gmail address.
 * @property {string} req.body.password - The password of the user. It must be at least 3 characters long.
 * @property {string} req.body.firstName - The first name of the user.
 * @property {string} req.body.lastName - The last name of the user.
 * @property {string} req.body.phoneNumber - The phone number of the user. It must start with +380 and be 13 characters long.
 * 
 * @throws {string} "Content can not be empty!" - If the request body is empty.
 * @throws {string} "Required fields are missing!" - If the request body does not have all the required fields (email, password, firstName, lastName, phoneNumber).
 * @throws {string} "Invalid email!" - If the email is not a valid Gmail address.
 * @throws {string} "Password must be at least 3 characters!" - If the password is less than 3 characters long.
 * @throws {string} "Phone number must have 13 characters and start with +380!" - If the phone number does not start with +380 or is not 13 characters long.
 * @throws {string} "User with the same email already exists!" - If a user with the same email already exists.
 * @throws {string} "User with the same phone number already exists!" - If a user with the same phone number already exists.
 */

const createUserValid = (req, res, next) => {
  // DONE: Implement validatior for USER entity during creation

  // Convert the email to lowercase
  if(req.body.email )
    {
      req.body.email = req.body.email.toLowerCase();
    }

  // Check if the request body is empty
  if (!req.body) {
    req.error_message = "Content can not be empty!"
  }

  // Check if the request body has all the required fields
  if (!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName || !req.body.phoneNumber ) {
   req.error_message = "Required fields are missing!"
  }

  // Check if the email is valid
  if (req.body.email && !req.body.email.includes("@gmail.com")) {
    req.error_message = "Invalid email!"
  }

  // Check if the password is valid
  if (req.body.password) {
    if (req.body.password.length < 3)
      {
        req.error_message = "Password must be at least 3 characters!"
      }
  }

  // CHeck if the phone number starts with +380 and has 13 characters
  if (req.body.phoneNumber ) {
    if (!req.body.phoneNumber.startsWith("+380") || req.body.phoneNumber.length !== 13) {
      req.error_message = "Phone number must have 13 characters and start with +380!"
    }
  }

  // Check if the user with the same email already exists
  if (!isEmailValid(req.body.email)) {
    req.error_message = "User with the same email already exists!"
  }
    
  //Check if the user with the same phone number already exists
  if (!isPhoneNumberValid(req.body.phoneNumber)) {
    req.error_message = "User with the same phone number already exists!"
  }
    
  next();
};


/**
 * Middleware function for validating a user entity during update.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * 
 * @property {Object} req.body - The body of the request. It should not be empty.
 * @property {string} req.params.id - The ID of the user to update.
 * 
 * @throws {string} "Content can not be empty!" - If the request body is empty.
 * @throws {string} "User not found!" - If the user with the provided ID does not exist.
 */
const updateUserValid = (req, res, next) => {
  // DONE: Implement validatior for user entity during update DONE!

  // Check if the request body is empty
  if (!req.body) {
    req.error_message = "Content can not be empty!";
  }

  // Check if the requested user exists
  const user = userRepository.getOne({ id: req.params.id });
  if (!user) {
    req.error_message = "User not found";
  }
  next();
};


/**
 * Function to validate if a user's email is unique.
 * 
 * @param {string} email - The email of the user.
 * 
 * @returns {boolean} - Returns false if a user with the same email exists, true otherwise.
 */
function isEmailValid(email) {
var user = userRepository.getOne({ email });
if (user) {
  return false;
}
else {
  return true;
}
}


/**
 * Function to validate if a user's phone number is unique.
 * 
 * @param {string} phoneNumber - The phone number of the user.
 * 
 * @returns {boolean} - Returns false if a user with the same phone number exists, true otherwise.
 */
function isPhoneNumberValid(phoneNumber) {
  var user = userRepository.getOne({ phoneNumber });
  if (user) {
    return false;
  }
  else {
    return true;
  }
}
  


export { createUserValid, updateUserValid };
