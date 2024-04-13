const User = require('./User'); // import User model (https://sequelize.org/docs/v6/core-concepts/model-basics/)
const Post = require('./Post'); // import Post model (https://sequelize.org/docs/v6/core-concepts/model-basics/)
const Comment = require('./Comment'); // import Comment model (https://sequelize.org/docs/v6/core-concepts/model-basics/)

User.hasMany(Post, { // User has many Posts (https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-many)
  foreignKey: 'username', // foreign key for username (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys)
});

Post.belongsTo(User, { // Post belongs to User (https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-many)
  foreignKey: 'username', // foreign key for username (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys)
});

Comment.belongsTo(User, { // Comment belongs to User (https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-many)
  foreignKey: 'username', // foreign key for username (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys)
});

Post.hasMany(Comment, { // Post has many Comments (https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-many)
  foreignKey: 'post_id', // foreign key for post id (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys)
});

module.exports = { User, Post, Comment }; // export User, Post, and Comment models (https://sequelize.org/docs/v6/core-concepts/model-basics/)