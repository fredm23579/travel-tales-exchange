const sequelize = require('../config/connection'); // Import the connection object from config/connection.js
const { User, Post, Comment } = require('../models'); // Import the User, Post, and Comment models

const userData =  require('./userData.json'); // Import the userData.json file
const postData =  require('./postData.json'); // Import the postData.json file
const commentData =  require('./commentData.json'); // Import the commentData.json file

// seed database function
const seedDatabase = async () => {   
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();