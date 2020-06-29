const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../config/config')
const debug = require('debug')('app:model-index')

const db = {}

if (config.node_env === 'dev') debug(config);

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

// ASSOCIATIONS

/** **********---------------*********
 ************| Content SERVICE |*********
 ************---------------********* */
// Answer
db.answer.belongsTo(db.question);

// Questions
db.question.hasMany(db.answer);
db.question.hasMany(db.response);
db.question.hasMany(db.question_video);

// Question Videos
db.question_video.belongsTo(db.question);
db.question_video.belongsTo(db.video);

// Response
db.response.belongsTo(db.question);

// Videos
db.video.hasMany(db.question_video);
/** ***********-----------------*******
 ************| COURSE SERVICE |*********
 ************-----------------******* */
// Courses
db.course.hasMany(db.course_history);
db.course.hasMany(db.course_section);

// Course History
db.course_history.belongsTo(db.course);

// Course Sections
db.course_section.belongsTo(db.course);
db.course_section.belongsTo(db.section);

// Section
db.section.hasMany(db.course_section);
db.section.hasMany(db.section_question);
db.section.hasMany(db.section_video);

// Section Question
db.section_question.belongsTo(db.section);

// Section Video
db.section_video.belongsTo(db.section);

/** **********---------------*********
************| USER SERVICE |*********
************---------------********* */
// Permissions
db.permission.hasMany(db.user);

// Users
db.user.belongsTo(db.permission);


(async function () {
  try {
    await sequelize.authenticate();
    debug('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = db;
