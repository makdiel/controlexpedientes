const Expedientes = require("./Expedientes");
const Users = require("./Users");
const Historial = require("./Historial");

// Relación Expediente → Historial (Uno a Muchos)
Expedientes.hasMany(Historial, { foreignKey: "id_expediente" });
Historial.belongsTo(Expedientes, { foreignKey: "id_expediente" });

// Relación Usuarios → Historial (Uno a Muchos, Dos veces)
Users.hasMany(Historial, { foreignKey: "id_usuario_anterior", as: "usuarioAnterior" });
Users.hasMany(Historial, { foreignKey: "id_usuario_nuevo", as: "usuarioNuevo" });

Historial.belongsTo(Users, { foreignKey: "id_usuario_anterior", as: "usuarioAnterior" });
Historial.belongsTo(Users, { foreignKey: "id_usuario_nuevo", as: "usuarioNuevo" });

module.exports = { Expedientes, Users, Historial };