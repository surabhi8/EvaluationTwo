

module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define('Likes', {
    bookId: DataTypes.INTEGER,
    likes: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return Likes;
};
