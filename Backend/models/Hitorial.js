const { DataTypes } = require("sequelize");
const sequelize = require("../db/conexion"); // Conexión a la BD
const Expedientes = require("./Expedientes"); // Importamos el modelo de Expedientes
const Users = require("./Users"); // Importamos el modelo de Usuarios

const Historial = sequelize.define(
  "Historial",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_expediente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Expedientes,
        key: "id_expediente",
      },
    },
    id_usuario_anterior: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "id_usuario",
      },
    },
    id_usuario_nuevo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "id_usuario",
      },
    },
    fecha_transferencia: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Se asigna la fecha actual por defecto
    },
    comentario: {
      type: DataTypes.STRING(300),
      allowNull: true, // Puede ser nulo
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // TRUE: activo, FALSE: inactivo
    },
  },
  {
    tableName: "historial",
    timestamps: false, // Evita que Sequelize agregue automáticamente `createdAt` y `updatedAt`
  }
);

module.exports = Historial;

