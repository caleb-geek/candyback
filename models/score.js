'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Score.belongsTo(models.User);
      Score.belongsTo(models.Game);
    }
  };
  Score.init({
    userId: {
      type:DataTypes.INTEGER
      ,
      references :{
        model:'Users',
        key:'id'
      },
      onDelete:"SET NULL",
      onUpdate:"CASCADE"
    },
    gameId: {
      type:DataTypes.INTEGER
      ,
      references :{
        model:'Gamess',
        key:'id'
      },
      onDelete:"SET NULL",
      onUpdate:"CASCADE"
    },
    noOfkills: DataTypes.INTEGER,
    playerStatus: DataTypes.STRING
    
  }, {
    sequelize,
    modelName: 'Score',
  });
  return Score;
};