const { DataTypes } = require("sequelize");
const sequelize = require("../db/conexion");
const Users = require("./Users");
const Expedientes = require("./Expedientes");

const Historial = sequelize.define(
  "Historial",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_expediente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_transferencia: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    comentario: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "historial",
  }
);

// 📌 Relación con Expedientes
Historial.belongsTo(Expedientes, { foreignKey: "id_expediente" });

// 📌 Relación con Usuarios
Historial.belongsTo(Users, { foreignKey: "id_usuario" });

// ✅ Exportamos el modelo corregido
module.exports = Historial;
