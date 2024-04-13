const sequelize = require('../config/connection'); // Import the connection object from config/connection.js
const { User, Post, Comment } = require('../models'); // Import the User, Post, and Comment models

const userData =  require('./userData.json'); // Import the userData.json file
const postData =  require('./postData.json'); // Import the postData.json file
const commentData =  require('./commentData.json'); // Import the commentData.json file

// seed database function (https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-many) that synchronizes the database with the models and seeds the database with the data from the JSON files
const seedDatabase = async () => { // seedDatabase function (https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-many)
  await sequelize.sync({ force: true }); // sync method (https://sequelize.org/docs/v6/core-concepts/model-basics/#sync

  await User.bulkCreate(userData, { // bulkCreate method (https://sequelize.org/docs/v6/core-concepts/model-basics/#bulk-create) 
    individualHooks: true, // individualHooks method (https://sequelize.org/docs/v6/core-concepts/model-basics/#individual-hooks)
    returning: true, // returning method (https://sequelize.org/docs/v6/core-concepts/model-basics/#returning) 
  });

  await Post.bulkCreate(postData, { // bulkCreate method (https://sequelize.org/docs/v6/core-concepts/model-basics/#bulk-create)
    individualHooks: true, // individualHooks method (https://sequelize.org/docs/v6/core-concepts/model-basics/#individual-hooks)
    returning: true, // returning method (https://sequelize.org/docs/v6/core-concepts/model-basics/#returning)
  });

  await Comment.bulkCreate(commentData, { // bulkCreate method (https://sequelize.org/docs/v6/core-concepts/model-basics/#bulk-create)
    individualHooks: true, // individualHooks method (https://sequelize.org/docs/v6/core-concepts/model-basics/#individual-hooks)
    returning: true, // returning method (https://sequelize.org/docs/v6/core-concepts/model-basics/#returning)
  });

  process.exit(0); // exit process (https://nodejs.org/api/process.html#processexitcodecode) 
};

seedDatabase(); // seedDatabase function (https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-many)