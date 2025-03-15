const { DataTypes } = require("sequelize");
const sequelize = require('../db/conexion');

const Users = sequelize.define("Usuario", {
  id_usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
nombre_completo: {
    type: DataTypes.STRING(50),
    allowNull: false
},
nombre_usuario: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
},
contrasena: {
    type: DataTypes.STRING(50),
    allowNull: false
},
unidad_area: {
    type: DataTypes.STRING(50),
    allowNull: false
},
administrador: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
}
}, {
timestamps: false,
tableName: 'usuario'
});
module.exports = Users;