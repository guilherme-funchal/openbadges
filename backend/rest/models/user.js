const { Model, DataTypes } = require('sequelize')

class User extends Model {
  static init(sequelize) {
    super.init({       
        username: DataTypes.STRING, 
        email: DataTypes.STRING,
        type: DataTypes.STRING,
        image: DataTypes.STRING,
        pass_hash: DataTypes.STRING,
        pass_salt: DataTypes.STRING,
        created_at: DataTypes.STRING,
        updated_at: DataTypes.STRING,
        last_login: DataTypes.STRING,
        entity_id: DataTypes.STRING,
        level: DataTypes.INTEGER
    }, {
      tableName: 'users',
      sequelize
    })
  }
}

module.exports = User
