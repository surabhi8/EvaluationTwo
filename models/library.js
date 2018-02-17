'use strict';
module.exports = (sequelize, DataTypes) => {
  var Library = sequelize.define('Library', {
    author: DataTypes.STRING,
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    rating: DataTypes.NUMBER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Library;
};