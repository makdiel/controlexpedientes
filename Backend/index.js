const express = require("express");
const Users = require("./models/Users")
const cors = require("cors");
const { where } = require("sequelize");

const app = express();

app.use(express.json());

app.use(cors());

app.listen(5000, () => {
  console.log("ejecutando en puerto 5000");
});

//--------------------------------------Obtener Usuarios--------------------------------------
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

  //---------------------------------Obtener Expedientes-----------------------------------------
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