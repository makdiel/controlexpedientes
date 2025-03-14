const { DataTypes } = require("sequelize");
const sequelize = require('../db/conexion');

const Expedientes = sequelize.define("Expediente", {
  id_expediente: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  numero_expediente: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  nombre_establecimiento: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  region_sanitaria: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  departamento: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: "expediente",
  timestamps: false,
});

module.exports = Expedientes;