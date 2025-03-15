const express = require("express");
const cors = require("cors");

// Importar modelos y asociaciones
const Users = require("./models/Users");
const Expedientes = require("./models/Expedientes");
const Historial = require("./models/Historial");


// Inicializar Express
const app = express();
app.use(express.json());
app.use(cors());

app.listen(5000, () => {
  console.log("ejecutando en puerto 5000");
});

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
    res.status(500).json({ error: "Ocurrio un error en la peticion." });
  }
});

// Login de usuario con comparación simple de contraseña
app.post("/users/login", async (req, res) => {
  const { nombre_usuario, contrasena } = req.body;

  try {
    // Buscar usuario por nombre de usuario
    const usuario = await Users.findOne({ where: { nombre_usuario } });

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado." });
    }

    // Comparar contraseñas sin hasheo
    if (contrasena !== usuario.contrasena) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas." });
    }

    // Responder con los datos del usuario, incluyendo la unidad
    res.json({
      id_usuario: usuario.id_usuario,
      nombre_completo: usuario.nombre_completo,
      nombre_usuario: usuario.nombre_usuario,
      unidad_area: usuario.unidad_area,  // 🔹 Devuelve la unidad del usuario
      administrador: usuario.administrador,
    });

  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ error: "Ocurrió un error en la autenticación." });
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
    res.status(500).json({ error: "Ocurrio un error en la peticion." });
  }
});

// Obtener expediente por numero_expediente
app.get("/expedientes/:numero_expediente", async (req, res) => {
  try {
    const { numero_expediente } = req.params;
    const expediente = await Expedientes.findOne({ where: { numero_expediente } });

    if (!expediente) {
      return res.status(404).json({ mensaje: "Expediente no encontrado." });
    }

    res.json(expediente);
  } catch (error) {
    console.error("Error al obtener expediente:", error);
    res.status(500).json({ error: "Ocurrió un error en la petición." });
  }
});

// Crear un nuevo expediente
app.post("/expedientes", async (req, res) => {
  try {
    const { numero_expediente, nombre_establecimiento, region_sanitaria, departamento, unidad_area, id_usuario } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!numero_expediente || !nombre_establecimiento || !region_sanitaria || !departamento || !unidad_area || !id_usuario) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios." });
    }

    // Verificar si el expediente ya existe
    const expedienteExistente = await Expedientes.findOne({ where: { numero_expediente } });
    if (expedienteExistente) {
      return res.status(400).json({ mensaje: "El número de expediente ya está registrado." });
    }

    // Crear el nuevo expediente
    const nuevoExpediente = await Expedientes.create({
      numero_expediente,
      nombre_establecimiento,
      region_sanitaria,
      departamento,
      unidad_area,
      estado: true, // Por defecto, el expediente está activo
      fecha_creacion: new Date(),
      id_usuario
    });

    res.status(201).json({ mensaje: "Expediente creado exitosamente.", expediente: nuevoExpediente });
  } catch (error) {
    console.error("Error al crear expediente:", error);
    res.status(500).json({ error: "Ocurrió un error en la petición." });
  }
});

//editar expediente
app.put("/expedientes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      numero_expediente,
      nombre_establecimiento,
      region_sanitaria,
      departamento,
      unidad_area,
      estado,
      id_usuario
    } = req.body;

    // Buscar el expediente por ID
    const expediente = await Expedientes.findByPk(id);
    if (!expediente) {
      return res.status(404).json({ mensaje: "Expediente no encontrado." });
    }

    // Actualizar los campos del expediente
    await expediente.update({
      numero_expediente,
      nombre_establecimiento,
      region_sanitaria,
      departamento,
      unidad_area,
      estado,
      id_usuario
    });

    res.json({ mensaje: "Expediente actualizado correctamente.", expediente });
  } catch (error) {
    console.error("Error al actualizar expediente:", error);
    res.status(500).json({ error: "Ocurrió un error en la petición." });
  }
});




//---------------------------------Historial-----------------------------------------//
// Obtener Historial
app.get("/Historial", async (req, res) => {
  try {
    const historial = await Historial.findAll();
    if (!historial.length) {
      return res.status(404).json({ mensaje: "No hay registros de historial." });
    }
    res.json(historial);
  } catch (error) {
    console.error("Error al obtener historial:", error);
    res.status(500).json({ error: "Ocurrio un error en la peticion." });
  }
});

