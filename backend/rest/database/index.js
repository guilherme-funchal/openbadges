const Sequelize = require('sequelize');
const configDB = require('../config/database');

const User = require('../models/user')

const connection = new Sequelize(configDB)

User.init(connection)

module.exports = connection