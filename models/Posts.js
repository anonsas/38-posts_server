// Creating a model, for our Table (Posts) in (posts_app) database.

module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      onDelete: 'cascade',
    });
  };

  Posts.associate = (models) => {
    Posts.hasMany(models.Likes, {
      onDelete: 'cascade',
    });
  };

  // If we would delete a POST, it would delete
  // every comment related to that POST.

  return Posts;
};
