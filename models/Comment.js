const { Model, DataTypes } = require('sequelize'); // import sequelize (https://sequelize.org/docs/v6/core-concepts/model-basics/)
const sequelize = require('../config/connection'); 

class Comment extends Model {} // Comment model (https://sequelize.org/docs/v6/core-concepts/model-basics/)

Comment.init(  
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creator: {
      type: DataTypes.STRING,
      references: {
        model: 'user',
        key: 'username',
      }
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // records date/time at time of creation
    },
    post_id: {  // foreign key for post id (https://sequelize.org/docs/v6/core-concepts/assocs/#foreign-keys)
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { 
        model: 'post',
        key: 'id', // foreign key for post id
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

module.exports = Comment;