const { Model, DataTypes } = require('sequelize');
const sequelize = require('..config/connection');
// incorporate bcrypt and password compare/hash later

class User extends Model {}

User.init(
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
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isLongerThanEight(pw) {
          if (pw.length < 8) {
            throw new Error('Password must be at least 8 characters long.');
          }
        },
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;