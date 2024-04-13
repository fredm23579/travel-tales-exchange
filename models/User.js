const { Model, DataTypes } = require('sequelize'); // import sequelize (https://sequelize.org/docs/v6/core-concepts/model-basics/)
const sequelize = require('../config/connection'); // import connection object from connection.js (https://sequelize.org/docs/v6/core-concepts/connections-and-transactions/)
const bcrypt = require('bcrypt'); // import bcrypt (https://www.npmjs.com/package/bcrypt)

class User extends Model { // User model (https://sequelize.org/docs/v6/core-concepts/model-basics/)
  checkPassword(loginPw) { // checkPassword method (https://sequelize.org/docs/v6/core-concepts/model-basics/#custom-methods)
    return bcrypt.compareSync(loginPw, this.password); // compareSync method (https://www.npmjs.com/package/bcrypt)
  }
}

User.init(  // User model (https://sequelize.org/docs/v6/core-concepts/model-basics/)
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { // password validation (https://sequelize.org/docs/v6/core-concepts/model-basics/#validations)
        len: [8], // password must be at least 8 characters long
      },
    },
  },
  {
    hooks: { // hooks (https://sequelize.org/master/manual/hooks.html)
      beforeCreate: async (newUserData) => { // beforeCreate hook (https://sequelize.org/master/manual/hooks.html)
        newUserData.password = await bcrypt.hash(newUserData.password, 10); // hash password (https://www.npmjs.com/package/bcrypt)
        return newUserData;
      },
    },
    sequelize,
    freezeTableName: true,  
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;