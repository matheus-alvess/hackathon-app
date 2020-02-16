import Sequelize, { Model } from 'sequelize';

class Rating extends Model {
  static init(sequelize) {
    super.init(
      {
        worker_id: Sequelize.NUMBER,
        company_id: Sequelize.NUMBER,
        satisfaction: Sequelize.FLOAT,
        productivity: Sequelize.FLOAT,
        attendance: Sequelize.FLOAT,
        created_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Rating;
