const {Sequelize} =require('sequelize')

const sequelize = new Sequelize(
    'gestionexpedientes',//nombre de la base de datos
    'root',
    'Admin123',
    {
        host:'localhost', //host 127.0.0.1
        port:3306, //puerto 3306
        dialect:'mysql' //definimos que usamos lenguaje mysql
    }
)

sequelize.authenticate()
    .then(()=>console.log('Conexion establecidda Correctamente')) //si la conexion es exitosa mostramos un mensaje
    .catch(err=> console.log("Error en la conexion" + err)) //si hay un error mostramos el error

module.exports= sequelize //exportamos el modulo sequelize