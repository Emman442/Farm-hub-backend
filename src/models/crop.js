'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Crop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define the association with User (who created the crop)
      Crop.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
    
  }
  }
  Crop.init({
    crop_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Crop name cannot be empty' },
      },
    },
    variety:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Variety cannot be empty' },
      },
    },
    sowing_area: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Sowing area cannot be empty' },
      },
    },
    soil_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'soil type cannot be empty' },
      },
    },
    sowing_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Sowing date cannot be empty' },
      },
    },
    hectare: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'number of hectares cannot be empty' },
      },
    },
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', // Name of the table you're referencing (Users)
        key: 'id'      // Key in the User model that you're referencing
      }
    }
  
  }, {
    sequelize,
    modelName: 'Crop',
  });
  return Crop;
};