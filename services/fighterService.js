import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters

  async getAllFighters() {
    const fighters = fighterRepository.getAll();
    return fighters;
  }

  async getFighterById(id) {
    const fighter = fighterRepository.getOne(id);
    return fighter;
  }

  async updateFighter(id, dataToUpdate) {
    const fighter = fighterRepository.update(id, dataToUpdate);
    return fighter;
  }

  async deleteFighter(id) {
    const fighter = fighterRepository.delete(id);
    return fighter;
  }

  async createFighter(fighter) {
    const newFighter = fighterRepository.create(fighter);
    return newFighter;
  }

  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }




}

const fighterService = new FighterService();

export { fighterService };
