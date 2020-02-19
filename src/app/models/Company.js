import Sequelize, { Model } from 'sequelize';

class Company extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        occupation: Sequelize.STRING,
        owner_id: Sequelize.NUMBER,
        created_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Company;
