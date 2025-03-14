const express = require("express");
const Users = require("./models/Users")// importamos el modelo de usuarios
const Expedientes = require("./models/Expedientes") // importamos el modelo de expedientes
const Historial = require("./models/Historial"); // importamos el modelo de historial
const cors = require("cors");
const { where } = require("sequelize");

const app = express();

app.use(express.json());

app.use(cors());

app.listen(5000, () => {
  console.log("ejecutando en puerto 5000");
});

//--------------------------------------Usuarios--------------------------------------//
//obtener usuarios
app.get("/users", async (req, res) => {
    try {
      //SELECT * FROM usuarios
      const usuarios = await Users.findAll();
      if (usuarios.length == 0) {
        res.status(400).json({ mensaje: "Sin registros de usuarios" });
      } else {
        res.status(200).json(usuarios);
      }
    } catch (error) {
      res.status(500).json({ Error: "Ocurrio un error en la peticion" });
    }
  });

  //---------------------------------Expedientes-----------------------------------------//
  //obtener expedientes
  app.get("/expedientes", async (req, res) => {
    try {
        const expedientes = await Expedientes.findAll();
        if (expedientes.length == 0 ){
            res.status(400).json({ mensaje: "Sin registros de expedientes" });
        }else{
            res.status(200).json(expedientes); 
        }
    } catch (error) {
        res.status(500).json({ Error: "Ocurrio un error en la peticion" });
    }
  })
  
  //crear expediente
app.post("/expediente", async (req, res) => {
    try {
      console.log(req.body);
      const expediente = await Expedientes.create(req.body);
      res.status(200).json(expediente);
    } catch (error) {
      res.status(500).json({ Error: "Ocurrio un error al crear el expediente" });
    }
  });

  //---------------------------------Consultas provisionales Historial-----------------------------------------//

  // Buscar historial por numero_expediente
  app.get("/historial/expediente/:numero", async (req, res) => {
    try {
      const { numero } = req.params; // Se usara para buscar el expediente por numero (ej: E4445 ó 003-2525)
  
      // Buscar el expediente por numero
      const expediente = await Expedientes.findOne({ where: { numero_expediente: numero } });
  
      if (!expediente) {
        return res.status(404).json({ mensaje: "Expediente no encontrado" });
      }
  
      // Buscar historial con JOIN para incluir informacion de usuario y expediente
      const historial = await Historial.findAll({
        where: { id_expediente: expediente.id_expediente },
        attributes: ["estado"], // Solo necesitamos el estado del historial
        include: [
          {
            model: Expedientes,
            attributes: ["numero_expediente", "nombre_establecimiento", "region_sanitaria", "departamento"],
          },
          {
            model: Users,
            as: "usuario_anterior", // Alias para identificar al usuario anterior
            attributes: ["nombre_usuario", "nombre_completo"],
          },
          {
            model: Users,
            as: "usuario_nuevo", // Alias para identificar al usuario nuevo
            attributes: ["nombre_usuario", "nombre_completo"],
          },
        ],
      });
  
      // Formatear la respuesta para estructurarla como se requiere
      const respuesta = historial.map((h) => ({
        numero_expediente: h.Expediente.numero_expediente,
        nombre_establecimiento: h.Expediente.nombre_establecimiento,
        region_sanitaria: h.Expediente.region_sanitaria,
        departamento: h.Expediente.departamento,
        usuario_anterior: {
          nombre_usuario: h.usuario_anterior?.nombre_usuario || "Desconocido",
          nombre_completo: h.usuario_anterior?.nombre_completo || "Desconocido",
        },
        usuario_nuevo: {
          nombre_usuario: h.usuario_nuevo?.nombre_usuario || "Desconocido",
          nombre_completo: h.usuario_nuevo?.nombre_completo || "Desconocido",
        },
        estado: h.estado ? "Activo" : "Inactivo",
      }));
  
      res.status(200).json(respuesta);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al buscar el historial" });
    }
  });
  



// Buscar historial por nombre_usuario o nombre_completo
app.get("/historial/usuario/:nombre", async (req, res) => {
  try {
    const { nombre } = req.params;
    const usuarios = await Users.findAll({
      where: {
        [Op.or]: [{ nombre_usuario: nombre }, { nombre_completo: nombre }],
      },
    });

    if (usuarios.length === 0) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    const usuarioIds = usuarios.map((usuario) => usuario.id_usuario);
    const historial = await Historial.findAll({
      where: {
        [Op.or]: [{ id_usuario_anterior: usuarioIds }, { id_usuario_nuevo: usuarioIds }],
      },
    });

    res.status(200).json(historial);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar el historial" });
  }
});

// Buscar historial por fecha (día/mes/año)
app.get("/historial/fecha/:fecha", async (req, res) => {
  try {
    const { fecha } = req.params;
    const historial = await Historial.findAll({
      where: { fecha_transferencia: new Date(fecha) },
    });
    res.status(200).json(historial);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar por fecha" });
  }
});


  