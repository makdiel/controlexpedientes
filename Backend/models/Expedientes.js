/*
create table expediente(
 id_expediente integer auto_increment primary key ,
 numero_expediente varchar(50) not null,
 nombre_establecimiento varchar(50) not null,
 region_sanitaria varchar(100) not null,
 departamento varchar(50) not null,
 Unidad_area varchar(50) not null,
 id_Usuario INT not null,
 observaciones varchar(300) not null,
 fecha_creacion timestamp default current_timestamp,
 constraint FK_UsuariosidUsuario Foreign Key(id_Usuario) REFERENCES usuario(id_Usuario)
);
*/

const { DataTypes } = require("sequelize");
const sequelize = require('../db/Connection');

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
  Unidad_area: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  id_Usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  observaciones: {
    type: DataTypes.STRING(300),
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