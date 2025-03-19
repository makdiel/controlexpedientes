'use client'
import ListaUsuarioComponent from '@/app/Components/ListaUsuarioComponent'
import { Usuario } from '@/app/Models/Usuario'
import { useUsuarioContext } from '@/app/Provider/ProviderUsuario'
import React from 'react'

export default function page() {

  const {id_usuario,setId,nombre_usuario,setNombreUsuario,contrasena,setContrasena,nombre_completo,setNombreCompleto,unidad_area,setUnidadArea,administrador,setAdministrador, agregarUsuario,usuario}= useUsuarioContext()

  function crearUsuario(){

    const usuario: Usuario={
      id_usuario:id_usuario,
      nombre_usuario:nombre_usuario,
      contrasena:contrasena,
      nombre_completo:nombre_completo,
      unidad_area:unidad_area,
      administrador:administrador
    }

    agregarUsuario(usuario)
  }

  return (
    <div className='container'>

        <h2>Agregar Usuarios </h2>

        <form className='form'>

          <div className='row'>

            <div className='col-md-6'>
            <input type="text" 
              className='form-control'
              name='nombre_usuario'
               id='nombre_usuario' 
               value={nombre_usuario}
               onChange={(event) => setNombreUsuario(event.target.value)}
               placeholder='Agregar nombre de usuario'
               />
            </div>

            <div className='col-md-6'>
            <input type="contraseña" 
             className='form-control'
               name='contraseña'
               id='contraseña' 
               value={contrasena}
               onChange={(event) => setContrasena(event.target.value)}
               placeholder='Agrgear Contraseña'
               />
              </div>

              <div className='col-md-6'>
            <input type="nombre_completo" 
             className='form-control'
               name='nombre_completo'
               id='nombre_completo' 
               value={nombre_completo}
               onChange={(event) => setNombreCompleto(event.target.value)}
               placeholder='Agrgear el nombre completo'
               />
              </div>

              <div className='col-md-6'>
            <input type="unidad_area" 
             className='form-control'
               name='unidad_area'
               id='unidad_area' 
               value={unidad_area}
               onChange={(event) => setUnidadArea(event.target.value)}
               placeholder='Agrgear el nombre de la unidad que pertenece'
               />
              </div>

              <div className='col-md-6'>
            <input type="administrador" 
             className='form-control'
               name='administrador'
               id='administrador' 
               value={0}
               onChange={(event) => setAdministrador(event.target.checked)}
               placeholder='definir si el usuario es administrador'
               />
              </div>
          </div> <br />

       

        

          <button className='btn btn-success' onClick={crearUsuario}>Agregar /Actualizar Usuario</button>

          <ListaUsuarioComponent Usuarios={usuario}></ListaUsuarioComponent>
        </form>

    </div>
  )
}
