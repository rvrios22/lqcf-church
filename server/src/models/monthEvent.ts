import { Sequelize, DataTypes, Model, ModelStatic, } from "sequelize"

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes): ModelStatic<Model> => {
    const MonthEvent = sequelize.define('monthEvent', {
        title: {
            type: dataTypes.STRING,
            allowNull: false
        },
        description: {
            type: dataTypes.STRING,
            allowNull: false
        },
        date: {
            type: dataTypes.DATE,
            allowNull: true
        },
    }, {})
    return MonthEvent
}