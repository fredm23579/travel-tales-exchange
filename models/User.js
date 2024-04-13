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
    id: { // id column (https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options)
      type: DataTypes.INTEGER, // data type (https://sequelize.org/master/identifiers.html) 
      allowNull: false, // allow null (https://sequelize.org/docs/v6/core-concepts/model-basics/#allowing-nulls)
      primaryKey: true, // primary key (https://sequelize.org/docs/v6/core-concepts/model-basics/#primary-keys)
      autoIncrement: true, // auto increment (https://sequelize.org/docs/v6/core-concepts/model-basics/#auto-incrementing)
    },
    username: { // username column (https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options)
      type: DataTypes.STRING, // data type (https://sequelize.org/master/identifiers.html) (https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types)
      allowNull: false, // allow null (https://sequelize.org/docs/v6/core-concepts/model-basics/#allowing-nulls)
      unique: true, // unique (https://sequelize.org/docs/v6/core-concepts/model-basics/#uniques)
    },
    password: { // password column (https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options)
      type: DataTypes.TEXT, // data type (https://sequelize.org/master/identifiers.html)
      allowNull: false, // allow null (https://sequelize.org/docs/v6/core-concepts/model-basics/#allowing-nulls)
      validate: { // password validation (https://sequelize.org/docs/v6/core-concepts/model-basics/#validations)
        len: [8], // password must be at least 8 characters long (https://sequelize.org/docs/v6/core-concepts/model-basics/#validations)
      },
    },
  },
  {
    hooks: { // hooks (https://sequelize.org/master/manual/hooks.html)
      beforeCreate: async (newUserData) => { // beforeCreate hook (https://sequelize.org/master/manual/hooks.html)
        newUserData.password = await bcrypt.hash(newUserData.password, 10); // hash password (https://www.npmjs.com/package/bcrypt)
        return newUserData; // return newUserData (https://sequelize.org/master/manual/hooks.html)
      },
    },
    sequelize, // for connecting to db with sequelize (default is ./config/connection.js) (https://sequelize.org/docs/v6/core-concepts/connections-and-transactions/)
    freezeTableName: true,   // for connecting to db with sequelize (default is ./config/connection.js) (https://sequelize.org/docs/v6/core-concepts/model-basics/)
    underscored: true, 
    modelName: 'user', 
  }
);

module.exports = User; // export User model (https://sequelize.org/docs/v6/core-concepts/model-basics/) (https://sequelize.org/docs/v6/core-concepts/model-basics/#exporting-models)