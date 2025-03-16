const { DataTypes } = require("sequelize");
const sequelize = require("../db/conexion");
const Users = require("./Users");

const Expedientes = sequelize.define(
  "Expedientes",
  {
    id_expediente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numero_expediente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre_establecimiento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region_sanitaria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departamento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unidad_area: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "expediente",
  }
);

// 📌 Relación con Usuarios
Expedientes.belongsTo(Users, { foreignKey: "id_usuario" });

// ✅ Exportamos sin definir relación con Historial aún
module.exports = Expedientes;
