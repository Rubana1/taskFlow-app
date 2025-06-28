const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    googleId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    profile: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
});

module.exports = User;
