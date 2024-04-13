const { Model, DataTypes } = require('sequelize'); // import sequelize (https://sequelize.org/docs/v6/core-concepts/model-basics/)
const sequelize = require('../config/connection'); 

class Comment extends Model {} // Comment model (https://sequelize.org/docs/v6/core-concepts/model-basics/)

Comment.init(  // Comment model (https://sequelize.org/docs/v6/core-concepts/model-basics/) 
  {
    id: { // id column (https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options) 
      type: DataTypes.INTEGER, // data type (https://sequelize.org/master/identifiers.html) 
      allowNull: false, // allow null (https://sequelize.org/docs/v6/core-concepts/model-basics/#allowing-nulls)
      primaryKey: true, // primary key (https://sequelize.org/docs/v6/core-concepts/model-basics/#primary-keys)
      autoIncrement: true, // auto increment (https://sequelize.org/docs/v6/core-concepts/model-basics/#auto-incrementing)
    },
    content: { // content column (https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options)
      type: DataTypes.STRING, // data type (https://sequelize.org/master/identifiers.html)
      allowNull: false, // allow null (https://sequelize.org/docs/v6/core-concepts/model-basics/#allowing-nulls)
    },
    creator: {  // foreign key for username (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys) (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys)
      type: DataTypes.STRING, // data type (https://sequelize.org/master/identifiers.html) (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys)
      references: { // foreign key for username (https //sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys) (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys)
        model: 'user', // model (https://sequelize.org/docs /v6/core-concepts/assocs/#foreign-keys) (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys)
        key: 'username', // foreign key for username (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys) (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys) (https://sequelize.org
      }
    },
    date_created: { // https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options (https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options)
      type: DataTypes.DATE, // data type (https://sequelize.org/master/identifiers.html) (https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types) 
      allowNull: false, // allow null (https://sequelize.org/docs/v6/core-concepts/model-basics/#allowing-nulls)
      defaultValue: DataTypes.NOW, // records date/time at time of creation (https://sequelize.org/docs/v6/core-concepts/model-basics/#default-values)
    },
    post_id: {  // foreign key for post id (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys) (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys)
      type: DataTypes.INTEGER, // data type (https://sequelize.org/master/identifiers.html) (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys)
      allowNull: false, // allow null (https://sequelize.org/docs/v6/core-concepts/model-basics/#allowing-nulls) (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys)
      references: {  // foreign key for post id (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys) (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys)
        model: 'post', // model (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys) (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys)
        key: 'id', // foreign key for post id (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys) (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys)
      }
    }
  },
  {
    sequelize, // for connecting to db with sequelize (default is ./config/connection.js)
    freezeTableName: true, // for connecting to db with sequelize (default is ./config/connection.js)
    underscored: true, // for connecting to db with sequelize (default is ./config/connection.js)
    modelName: 'comment', // for connecting to db with sequelize (default is ./config/connection.js)
  }
);

module.exports = Comment; // export Comment model (https://sequelize.org/docs/v6/core-concepts/model-basics/) (https://sequelize.org/docs/v6/core-concepts/model-basics/) (https://github