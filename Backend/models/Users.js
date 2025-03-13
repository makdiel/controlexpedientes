const { DataTypes } = require("sequelize");
const sequelize = require('../db/Connection');

const Users = sequelize.define("Usuario", {
  id_usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_usuario: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  contrasena: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  nombre_completo: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  unidad_area: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  administrador: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: "usuarios",
  timestamps: false,
});

module.exports = Users;