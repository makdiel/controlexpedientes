const express = require("express");
const cors = require("cors");
const { Op, Sequelize } = require("sequelize");
const sequelize = require("./db/conexion");

// Importar modelos y asociaciones
const Users = require("./models/Users");
const Expedientes = require("./models/Expedientes");
const Historial = require("./models/Historial");
require("./models/asociaciones"); // Importar asociaciones

// Inicializar Express
const app = express();
app.use(express.json());
app.use(cors());

// Sincronizar base de datos antes de levantar el servidor
sequelize
  .sync({ alter: true }) // Usa `force: true` si deseas reiniciar la base de datos (¡cuidado!)
  .then(() => {
    console.log("📦 Base de datos sincronizada correctamente");
    app.listen(5000, () => console.log("🚀 Servidor ejecutándose en puerto 5000"));
  })
  .catch((error) => console.error("⚠️ Error al sincronizar la base de datos:", error));

//--------------------------------------Usuarios--------------------------------------//
// Obtener usuarios
app.get("/users", async (req, res) => {
  try {
    const usuarios = await Users.findAll();
    if (!usuarios.length) {
      return res.status(404).json({ mensaje: "No hay usuarios registrados." });
    }
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Ocurrió un error en la petición." });
  }
});

//---------------------------------Expedientes-----------------------------------------//
// Obtener expedientes
app.get("/expedientes", async (req, res) => {
  try {
    const expedientes = await Expedientes.findAll();
    if (!expedientes.length) {
      return res.status(404).json({ mensaje: "No hay registros de expedientes." });
    }
    res.json(expedientes);
  } catch (error) {
    console.error("Error al obtener expedientes:", error);
    res.status(500).json({ error: "Ocurrió un error en la petición." });
  }
});

// Crear expediente con validación de duplicados
app.post("/expedientes", async (req, res) => {
  try {
    const { numero_expediente, nombre_establecimiento, region_sanitaria, departamento } = req.body;

    if (!numero_expediente || !nombre_establecimiento || !region_sanitaria || !departamento) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // Verificar si ya existe un expediente con el mismo numero_expediente
    const expedienteExistente = await Expedientes.findOne({
      where: { numero_expediente }
    });

    if (expedienteExistente) {
      return res.status(409).json({ error: "El expediente ya existe" });
    }

    // Crear expediente con fecha automática
    const expediente = await Expedientes.create({
      numero_expediente,
      nombre_establecimiento,
      region_sanitaria,
      departamento,
      fecha_creacion: new Date(),
    });

    res.status(201).json(expediente);
  } catch (error) {
    console.error("Error al crear expediente:", error);
    res.status(500).json({ error: "Ocurrió un error al crear el expediente" });
  }
});


//---------------------------------Consulta de Historial-----------------------------------------//
app.get("/historial/expedientes/:numero", async (req, res) => {
  try {
    const { numero } = req.params;

    // Buscar expediente
    const expediente = await Expedientes.findOne({
      where: { numero_expediente: numero },
      attributes: [
        "id_expediente",
        "numero_expediente",
        "nombre_establecimiento",
        "region_sanitaria",
        "departamento",
        "fecha_creacion",
      ],
    });

    if (!expediente) {
      return res.status(404).json({ mensaje: "Expediente no encontrado" });
    }

    // Obtener la última fecha de transferencia
    const ultimaTransferencia = await Historial.findOne({
      where: { id_expediente: expediente.id_expediente },
      attributes: [[sequelize.fn("MAX", sequelize.col("fecha_transferencia")), "ultima_fecha"]],
    });

    if (!ultimaTransferencia || !ultimaTransferencia.dataValues.ultima_fecha) {
      return res.status(404).json({ mensaje: "No hay historial para este expediente" });
    }

    const historial = await Historial.findOne({
      where: {
        id_expediente: expediente.id_expediente,
        fecha_transferencia: ultimaTransferencia.dataValues.ultima_fecha,
      },
      attributes: [
        "fecha_transferencia",
        [sequelize.literal("CASE WHEN estado = 1 THEN 'Activo' ELSE 'Inactivo' END"), "estado_expediente"],
      ],
      include: [
        {
          model: Users,
          as: "usuarioAnterior",
          attributes: ["nombre_usuario", "nombre_completo", ["unidad_area", "sale_de_area_unidad"]],
        },
        {
          model: Users,
          as: "usuarioNuevo",
          attributes: ["nombre_usuario", "nombre_completo", ["unidad_area", "entra_a_area_unidad"]],
        },
      ],
    });

    if (!historial) {
      return res.status(404).json({ mensaje: "No hay registros recientes en el historial" });
    }

    res.json({ expediente, historial });
  } catch (error) {
    console.error("Error al obtener historial:", error);
    res.status(500).json({ mensaje: "Error en el servidor", error });
  }
});

// Obtener historial general
app.get("/historial/expedientes", async (req, res) => {
  try {
    const historial = await Historial.findAll({
      attributes: [
        "id_expediente",
        "fecha_transferencia",
        [sequelize.literal("CASE WHEN estado = 1 THEN 'Activo' ELSE 'Inactivo' END"), "estado_expediente"],
      ],
      include: [
        {
          model: Expedientes,
          attributes: [
            "numero_expediente",
            "nombre_establecimiento",
            "region_sanitaria",
            "departamento",
            "fecha_creacion",
          ],
        },
        {
          model: Users,
          as: "usuarioAnterior",
          attributes: ["nombre_usuario", "nombre_completo", ["unidad_area", "sale_de_area_unidad"]],
        },
        {
          model: Users,
          as: "usuarioNuevo",
          attributes: ["nombre_usuario", "nombre_completo", ["unidad_area", "entra_a_area_unidad"]],
        },
      ],
      where: {
        fecha_transferencia: {
          [Op.eq]: sequelize.literal(`(
            SELECT MAX(h2.fecha_transferencia)
            FROM historial h2
            WHERE h2.id_expediente = historial.id_expediente
          )`),
        },
      },
      order: [["fecha_transferencia", "DESC"]],
    });

    if (!historial.length) {
      return res.status(404).json({ mensaje: "No hay historial registrado" });
    }

    res.json(historial);
  } catch (error) {
    console.error("Error al obtener el historial general:", error);
    res.status(500).json({ mensaje: "Error en el servidor", error });
  }
});
