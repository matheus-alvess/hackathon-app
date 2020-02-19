module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ratings', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      worker_id: {
        type: Sequelize.INTEGER,
        references: { model: 'workers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      company_id: {
        type: Sequelize.INTEGER,
        references: { model: 'companies', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      satisfaction: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      productivity: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      attendance: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('ratings');
  },
};
