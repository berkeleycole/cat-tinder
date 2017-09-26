'use strict';
module.exports = function(sequelize, DataTypes) {
  var Cat = sequelize.define('Cat', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    enjoys: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Cat;
};