import { BaseRepository } from "./baseRepository.js";

  /**
   * Constructor for the FightRepository class.
   */
class UserRepository extends BaseRepository {
    /**
   * Constructor for the UserRepository class.
   */
  constructor() {
    super("users");
  }
}

const userRepository = new UserRepository();

export { userRepository };
