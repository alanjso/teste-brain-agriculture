'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Produtoresrurais', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      nome_produtor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      document: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /^(([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}))$/i
        }
      },
      nome_fazenda: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: false
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false
      },
      area_total_fazenda: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      area_agricultavel: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      area_vegetacao: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      culturas_plantadas: {
        type: Sequelize.ARRAY(Sequelize.ENUM(['soja', 'milho', 'algodão', 'café', 'cana de açúcar'])),
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Produtoresrurais');
  }
};