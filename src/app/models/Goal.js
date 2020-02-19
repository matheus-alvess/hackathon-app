import Sequelize, { Model } from 'sequelize';

class Goal extends Model {
  static init(sequelize) {
    super.init(
      {
        owner_id: Sequelize.NUMBER,
        company_id: Sequelize.NUMBER,
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        status: Sequelize.STRING,
        checklist: Sequelize.STRING,
        deadline_at: Sequelize.DATE,
        created_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Goal;
