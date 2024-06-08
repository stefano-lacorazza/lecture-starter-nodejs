import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation

  // Check if the request body is empty
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Check if the request body has all the required fields
  if (!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName || !req.body.phoneNumber ) {
    res.status(400).send({ message: "Required fields are missing!" });
    return;
  }
  // Check if the email is valid
  if (!req.body.email.includes("@gmail.com")) {
    res.status(400).send({ message: "Invalid email!" });
    return;
  }
  // Check if the password is valid
  if (req.body.password.length < 3) {
    res.status(400).send({ message: "Password must be at least 3 characters!" });
    return;
  }
  // CHeck if the phone number starts with +380 and has 13 characters
  if (!req.body.phoneNumber.startsWith("+380") || req.body.phoneNumber.length !== 13) {
    res.status(400).send({ message: "Invalid phone number!" });
    return;
  }
  // Check if the user with the same email already exists
  if (USER.find((user) => user.email === req.body.email)) {
    res.status(400).send({ message: "User with the same email already exists!" });
    return;
  }
  //Check if the user with the same phone number already exists
  if (USER.find((user) => user.phoneNumber === req.body.phoneNumber)) {
    res.status(400).send({ message: "User with the same phone number already exists!" });
    return;
  }
  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  next();
};

export { createUserValid, updateUserValid };
