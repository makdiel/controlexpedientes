const { DataTypes } = require("sequelize");
const sequelize = require("../db/conexion");
const Users = require("./Users");

const Expedientes = sequelize.define("Expediente", {
  id_expediente: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  numero_expediente: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  nombre_establecimiento: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  region_sanitaria: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  departamento: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  unidad_area: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true // TRUE: en proceso (activo), FALSE: finalizado (inactivo)
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: "id_usuario"
    }
  }
}, {
  timestamps: false,
  tableName: "expediente"
});

Expedientes.belongsTo(Users, { foreignKey: "id_usuario" });

module.exports = Expedientes;
