module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('goals_workers', {
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
      goal_id: {
        type: Sequelize.INTEGER,
        references: { model: 'goals', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
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
    return queryInterface.dropTable('goals_workers');
  },
};
