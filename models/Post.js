const { Model, DataTypes } = require('sequelize'); // import sequelize (https://sequelize.org/docs/v6/core-concepts/model-basics/)
const sequelize = require('../config/connection'); // import connection object from connection.js (https://sequelize.org/docs/v6/core-concepts/connections-and-transactions/)

class Post extends Model {} // Post model (https://sequelize.org/docs/v6/core-concepts/model-basics/)

Post.init(  // Post model (https://sequelize.org/docs/v6/core-concepts/model-basics/)
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;