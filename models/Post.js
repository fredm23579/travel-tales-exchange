const { Model, DataTypes } = require('sequelize'); // import sequelize (https://sequelize.org/docs/v6/core-concepts/model-basics/)
const sequelize = require('../config/connection'); // import connection object from connection.js (https://sequelize.org/docs/v6/core-concepts/connections-and-transactions/)

class Post extends Model {} // Post model (https://sequelize.org/docs/v6/core-concepts/model-basics/)

Post.init(  // Post model (https://sequelize.org/docs/v6/core-concepts/model-basics/)
  {
    id: { // Post model (https://sequelize.org/docs/v6/core-concepts/model-basics/) (https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options)
      type: DataTypes.INTEGER, // data type (https://sequelize.org/master/identifiers.html) (https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types)
      allowNull: false, // allow null (https://sequelize.org/docs/v6/core-concepts/model-basics/#allowing-nulls) (https://sequelize.org/docs/v6/core-concepts/model-basics/#primary-keys) 
      primaryKey: true, // primary key (https://sequelize.org/docs/v6/core-concepts/model-basics/#primary-keys) (https://sequelize.org/docs/v6/core-concepts/model-basics/#auto-incrementing)
      autoIncrement: true, // auto increment (https://sequelize.org/docs/v6/core-concepts/model-basics/#auto-incrementing) 
    },
    title: { // title column (https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options) (https://sequelize.org/docs/v6/core-concepts/model-basics/#uniques)
      type: DataTypes.STRING, // data type (https://sequelize.org/master/identifiers.html) (https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types)
      allowNull: false, // allow null (https://sequelize.org/docs/v6/core-concepts/model-basics/#allowing-nulls) (https://sequelize.org/docs/v6/core-concepts/model-basics/#uniques)
    },
      content: { // content column (https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options) (https://sequelize.org/docs/v6/core-concepts/model-basics/#uniques)
      type: DataTypes.STRING, // data type (https://sequelize.org/master/identifiers.html) (https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types)
      allowNull: false, // allow null (https://sequelize.org/docs/v6/core-concepts/model-basics/#allowing-nulls) (https://sequelize.org/docs/v6/core-concepts/model-basics/#uniques)
    },
    creator: {  // foreign key for username (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys)
      type: DataTypes.STRING, // data type (https://sequelize.org/master/identifiers.html) (https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types)
      references: { // references (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys) (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys)
        model: 'user', // model (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys) (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys)
        key: 'username', // key (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys) (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys)
      }
    },
    date_created: { // date created column (https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options) (https://sequelize.org/docs/v6/core-concepts/model-basics/#uniques)
      type: DataTypes.DATE, // data type (https://sequelize.org/master/identifiers.html) (https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types)
      allowNull: false, // allow null (https://sequelize.org/docs/v6/core-concepts/model-basics/#allowing-nulls) (https://sequelize.org/docs/v6/core-concepts/model-basics/#uniques)
      defaultValue: DataTypes.NOW, // records date/time at time of creation (https://sequelize.org/docs/v6/core-concepts/model-basics/#default-values)
    },
  },
  {
    sequelize, // for connecting to db with sequelize (default is ./config/connection.js) (https://sequelize.org/docs/v6/core-concepts/model-basics/)
    freezeTableName: true, // for connecting to db with sequelize (default is ./config/connection.js) (https://sequelize.org/docs/v6/core-concepts/model-basics/)
    underscored: true, // for connecting to db with sequelize (default is ./config/connection.js) (https://sequelize.org/docs/v6/core-concepts/model-basics/) 
    modelName: 'post', // for connecting to db with sequelize (default is ./config/connection.js) (https://sequelize.org/docs/v6/core-concepts/model-basics/)
  }
);

module.exports = Post; // export Post model (https://sequelize.org/docs/v6/core-concepts/model-basics/) (https://sequelize.org/docs/v6/core-concepts/model-basics/)