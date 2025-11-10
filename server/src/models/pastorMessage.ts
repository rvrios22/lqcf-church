import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";

module.exports = (
  sequelize: Sequelize,
  dataTypes: typeof DataTypes
): ModelStatic<Model> => {
  const PastorMessage = sequelize.define(
    "pastorMessage",
    {
      message: {
        type: dataTypes.TEXT("long"),
        allowNull: false,
      },
      coramDeo: {
        type: dataTypes.TEXT("long"),
        allowNull: false,
      },
      author: {
        type: dataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  return PastorMessage;
};
