import Sequelize, { Model } from 'sequelize';

class Owner extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.NUMBER,
        created_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Owner;
