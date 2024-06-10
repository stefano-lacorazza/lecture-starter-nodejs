import { dbAdapter } from "../config/db.js";
import { randomUUID } from "node:crypto";


/**
 * BaseRepository class that provides basic CRUD operations.
 * 
 * @property {Object} dbContext - The database context.
 * @property {string} collectionName - The name of the collection.
 */
class BaseRepository {

    /**
   * Constructor for the BaseRepository class.
   * 
   * @param {string} collectionName - The name of the collection.
   */
  constructor(collectionName) {
    this.dbContext = dbAdapter.get(collectionName);
    this.collectionName = collectionName;
  }

    /**
   * Generates a unique identifier.
   * 
   * @returns {string} - A unique identifier.
   */
  generateId() {
    return randomUUID();
  }


    /**
   * Retrieves all entities from the collection.
   * 
   * @returns {Array} - An array of all entities in the collection.
   */
  getAll() {
    return this.dbContext.value();
  }

    /**
   * Retrieves a single entity from the collection based on the provided search criteria.
   * 
   * @param {Object} search - The search criteria.
   * 
   * @returns {Object} - The entity that matches the search criteria.
   */
  getOne(search) {
    return this.dbContext.find(search).value();
  }

    /**
   * Creates a new entity in the collection.
   * 
   * @param {Object} data - The data for the new entity.
   * 
   * @returns {Object} - The created entity.
   */
  create(data) {
    data.id = this.generateId();
    data.createdAt = new Date();
    const list = this.dbContext.push(data).write();
    return list.find((it) => it.id === data.id);
  }

    /**
   * Updates an existing entity in the collection.
   * 
   * @param {string} id - The identifier of the entity to update.
   * @param {Object} dataToUpdate - The new data for the entity.
   * 
   * @returns {Object} - The updated entity.
   */
  update(id, dataToUpdate) {
    dataToUpdate.updatedAt = new Date();
    return this.dbContext.find({ id }).assign(dataToUpdate).write();
  }

    /**
   * Deletes an entity from the collection.
   * 
   * @param {string} id - The identifier of the entity to delete.
   * 
   * @returns {Array} - The remaining entities in the collection.
   */
  delete(id) {
    return this.dbContext.remove({ id }).write();
  }
}

export { BaseRepository };
