import { Sequelize, DataTypes, Model, ModelStatic, } from "sequelize"

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes): ModelStatic<Model> => {
    const User = sequelize.define('user', {
        username: {
            type: dataTypes.STRING,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        admin: {
            type: dataTypes.BOOLEAN,
            defaultValue: false
        },
    }, {})
    return User
}