module.exports = (sequelize, Datatypes) => {
  return sequelize.define('permission', {
      id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      type: {
        type: Datatypes.STRING,
        required: true,
        allowNull: false
      },
      updated_at: { type: Datatypes.DATE },
      deleted_at: { type: Datatypes.DATE }
  },{
    underscore: true,
    paranoid: true
  })
}