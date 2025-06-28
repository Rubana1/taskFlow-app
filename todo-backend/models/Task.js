const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  dueDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pending',
  },
  priority: { // ✅ Add this field
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Medium', // Optional
  }
}, {
  tableName: 'Tasks',
  timestamps: true,
});

module.exports = Task;
