const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Company = require('./Company');

const JobPosting = sequelize.define('JobPosting', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Company,
      key: 'id',
    },
  },
  position: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  reward: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tech_stack: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'job_postings',
  timestamps: false,
});

JobPosting.belongsTo(Company, { foreignKey: 'company_id', as: 'company' });

module.exports = JobPosting;
