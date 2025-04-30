import { Sequelize, DataTypes, Model, ModelStatic, } from "sequelize"

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes): ModelStatic<Model> => {
    const PDF = sequelize.define('pdf', {
        title: {
            type: dataTypes.STRING,
            allowNull: false
        },
        pdfPath: {
            type: dataTypes.STRING,
            allowNull: false
        },
        date: {
            type: dataTypes.DATE,
            allowNull: true
        },
    }, {})
    return PDF
}