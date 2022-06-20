'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProdutorRural extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProdutorRural.init({
    nome_produtor: DataTypes.STRING,
    document: DataTypes.STRING,
    nome_fazenda: DataTypes.STRING,
    cidade: DataTypes.STRING,
    estado: DataTypes.STRING,
    area_total_fazenda: DataTypes.DOUBLE,
    area_agricultavel: DataTypes.DOUBLE,
    area_vegetacao: DataTypes.DOUBLE,
    culturas_plantadas: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Produtoresrurais',
  });
  return ProdutorRural;
};