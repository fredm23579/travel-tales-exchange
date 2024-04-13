const Sequelize = require('sequelize'); // import sequelize (https://sequelize.org/docs/v6/getting-started/)
require('dotenv').config(); // import dotenv (https://www.npmjs.com/package/dotenv) (https://github.com/sindresorhus/dotenv) 

let sequelize; // sequelize object (https://sequelize.org/docs/v6/getting-started/) 

if (process.env.JAWSDB_URL) { // if JAWSDB_URL is defined (https://devcenter.heroku.com/articles/jawsdb) 
  sequelize = new Sequelize(process.env.JAWSDB_URL); // use JAWSDB_URL (https://devcenter.heroku.com/articles/jawsdb) 
} else { // if JAWSDB_URL is not defined (https://devcenter.heroku.com/articles/jawsdb) 
  sequelize = new Sequelize( // use local database (https://sequelize.org/docs/v6/getting-started/) 
    process.env.DB_NAME, // database name (https://sequelize.org/docs/v6/getting-started/) 
    process.env.DB_USER, // database user (https://sequelize.org/docs/v6/getting-started/)
    process.env.DB_PASSWORD, // database password (https://sequelize.org/docs/v6/getting-started/) 
    {
      host: 'localhost', // database host (https://sequelize.org/docs/v6/getting-started/) 
      dialect: 'mysql', // database dialect (https://sequelize.org/docs/v6/getting-started/)
      port: 3306 // database port (https://sequelize.org/docs/v6/getting-started/)
    }
  );
}

module.exports = sequelize; // export sequelize object (https://sequelize.org/docs/v6/getting-started/)