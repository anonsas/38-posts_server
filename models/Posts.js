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

  // If we would delete a POST, it would delete
  // every Comments And Likes related to that POST.
  // onDelete: 'cascade'.
  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      onDelete: 'cascade',
    });

    Posts.hasMany(models.Likes, {
      onDelete: 'cascade',
    });
  };

  return Posts;
};
