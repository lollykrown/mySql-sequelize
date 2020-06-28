'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../config/config')
const debug = require('debug')('app:model-index')

const db = {}

debug(config)
const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: 'mysql',
  port: '3306',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

(async function () {
  try {
    await sequelize.authenticate();
    debug('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = db;
