import * as dotenv from 'dotenv';
dotenv.config();
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(
    'lqcf',
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
)

const PDF = require('./pdf')(sequelize, DataTypes)
const Study = require('./study')(sequelize, DataTypes)
const MonthEvent = require('./monthEvent')(sequelize, DataTypes)
const User = require('./user')(sequelize, DataTypes)

Study.hasMany(PDF)
PDF.belongsTo(Study)

const db = {
    sequelize,
    PDF,
    Study,
    MonthEvent,
    User
}
export default db