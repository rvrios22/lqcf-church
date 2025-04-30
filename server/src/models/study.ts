import { Sequelize, DataTypes, Model, ModelStatic, } from "sequelize"

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes): ModelStatic<Model> => {
    const Study = sequelize.define('study', {
        name: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        },
    }, {})
    return Study
}