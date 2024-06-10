import { BaseRepository } from "./baseRepository.js";


/**
 * FightRepository class that extends the BaseRepository class and provides CRUD operations for the fights collection.
 * 
 * @extends BaseRepository
 */
class FightRepository extends BaseRepository {
    /**
   * Constructor for the FightRepository class.
   */
  constructor() {
    super("fights");
  }
}

const fightRepository = new FightRepository();

export { fightRepository };
