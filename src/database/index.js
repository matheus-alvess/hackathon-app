import Sequelize from 'sequelize';
import User from '../app/models/User';
import Company from '../app/models/Company';
import Worker from '../app/models/Worker';
import Owner from '../app/models/Owner';
import Rating from '../app/models/Rating';
import databaseconfig from '../config/database';

const models = [User, Company, Worker, Owner, Rating];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseconfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
