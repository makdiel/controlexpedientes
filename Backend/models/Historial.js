const { DataTypes } = require("sequelize");
const sequelize = require("../db/conexion");
const Users = require("./Users");
const Expedientes = require("./Expedientes");

const Historial = sequelize.define("Historial", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_expediente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Expedientes,
      key: "id_expediente"
    }
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: "id_usuario"
    }
  },
  fecha_transferencia: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  comentario: {
    type: DataTypes.STRING(300),
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: "historial"
});

Historial.belongsTo(Users, { foreignKey: "id_usuario" });
Historial.belongsTo(Expedientes, { foreignKey: "id_expediente" });

module.exports = Historial;

