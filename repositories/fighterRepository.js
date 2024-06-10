import { BaseRepository } from "./baseRepository.js";

/**
 * FighterRepository class that extends the BaseRepository class and provides CRUD operations for the fighters collection.
 * 
 * @extends BaseRepository
 */
class FighterRepository extends BaseRepository {

    /**
   * Constructor for the FighterRepository class.
   */
  constructor() {
    super("fighters");
  }
}

const fighterRepository = new FighterRepository();

export { fighterRepository };
