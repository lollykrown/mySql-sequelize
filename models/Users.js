module.exports = (sequelize, Datatypes) => {
  return sequelize.define('user', {
      id: {
        type: Datatypes.UUIDV4,
        primaryKey: true
      },
      first_name: {
        type: Datatypes.STRING,
        isAlphanumeric: true,
        required: true,
        allowNull: true
      },
      last_name: {
        type: Datatypes.STRING,
        required: true,
        allowNull: true
      },
      username: {
        type: Datatypes.STRING,
        required: true,
        allowNull: true,
        len: [8, 20]
      },
      password: {
        type: Datatypes.STRING,
        required: true,
        allowNull: true,
        len: [8, 20]
      },
      email: {
        type: Datatypes.STRING,
        required: true,
        allowNull: true,
        len: [7, 100],
        isEmail: true
      },
      updated_at: { type: Datatypes.DATE },
      deleted_at: { type: Datatypes.DATE }
  },{
    underscore: true,
    paranoid: true
  })
}