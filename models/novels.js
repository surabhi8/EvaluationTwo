

module.exports = (sequelize, DataTypes) => {
  const Novels = sequelize.define('Novels', {
    author: DataTypes.STRING,
    bookId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    rating: DataTypes.STRING,
    likes: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return Novels;
};
