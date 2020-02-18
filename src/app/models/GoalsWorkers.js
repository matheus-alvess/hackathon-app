import Sequelize, { Model } from 'sequelize';

class GoalsWorkers extends Model {
  static init(sequelize) {
    super.init(
      {
        worker_id: Sequelize.NUMBER,
        goal_id: Sequelize.NUMBER,
        created_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default GoalsWorkers;
