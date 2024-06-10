import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user
  async getAllUsers() {
    const users = userRepository.getAll();
    return users;
  }


  async getUserById(id) {
    const user = userRepository.getOne(id);
    return user;
  }

  async updateUser(id, dataToUpdate) {
    const user = userRepository.update(id, dataToUpdate);
    return user;
  }

  async deleteUser(id) {
    const user = userRepository.delete(id);
    return user;
  }

  async createUser(user) {
    const newUser = userRepository.create(user);
    return newUser;
  }
  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
