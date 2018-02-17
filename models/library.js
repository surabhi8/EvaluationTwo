

module.exports = (sequelize, DataTypes) => {
  const Library = sequelize.define('Library', {
    author: DataTypes.STRING,
    bookId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    rating: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return Library;
};
