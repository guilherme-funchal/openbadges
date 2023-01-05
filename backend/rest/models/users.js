const { Model, DataTypes } = require('sequelize')

class User extends Model {
  static init(sequelize) {
    super.init({
        entityId: DataTypes.STRING, 
        name: DataTypes.STRING, 
        email: DataTypes.STRING,
        type: DataTypes.STRING,
        image: DataTypes.STRING,
        pass_hash: DataTypes.STRING,
        pass_salt: DataTypes.STRING,
        create_at: DataTypes.STRING,
        update_at: DataTypes.STRING,
        last_login: DataTypes.STRING,
    }, {
      tableName: 'users',
      sequelize
    })
  }
}

module.exports = User
