const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'username',
});

Post.belongsTo(User, {
  foreignKey: 'username',
});

Comment.belongsTo(User, {
  foreignKey: 'username',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
});

module.exports = { User, Post, Comment };