import { fightRepository } from "../repositories/fightRepository.js";

class FightService {
  // OPTIONAL TODO: Implement methods to work with fights

  async getAllFights() {
    return await fightRepository.getAll();
  }

  async getFight(id) {
    return await fightRepository.getOne(id);
  }

  async createFight(fight) {
    return await fightRepository.create(fight);
  }

  async updateFight(id, fight) {
    return await fightRepository.update(id, fight);
  }

  async deleteFight(id) {
    return await fightRepository.delete(id);
  }

  


}

const fightService = new FightService();

export { fightService };
