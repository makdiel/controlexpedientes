'use client'
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { Usuario } from '../Models/Usuario'
import { usuarioContext } from '../Context/UsuarioContext'
import { useRouter } from 'next/navigation'


interface VistaReact {
  children: ReactNode
}
export default function ProviderUsuario({ children }: VistaReact) {

  const [usuario, setUsuario] = useState<Usuario[]>([]);
  const router = useRouter();
  //const [usuarioSeleccionado, setUsuarioSeleccionado]= useState()


  const [id_usuario, setId] = useState(0)
  const [nombre_usuario, setNombreUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [nombre_completo, setNombreCompleto] = useState('')
  const [unidad_area, setUnidadArea] = useState('')
  const [administrador, setAdministrador] = useState(false)



  useEffect(() => {
    cargarUsuarios()
  }, [])

  async function cargarUsuarios() {
    try {

      const res = await fetch('http://localhost:5000/users')
      const data = await res.json()

      setUsuario(data)

    } catch (error) {
      alert('Ocurrio un error en la peticion' + error)
    }
  }

  async function logearUsuario(usuario: Usuario) {
    try {
      let res;
      if (id_usuario == 0) {
        res = await fetch('http://localhost:5000/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nombre_usuario: usuario.nombre_usuario,
            contrasena: usuario.contrasena
          })
        })
      }
      // Verificar si la respuesta es exitosa
      if (!res || !res.ok) {
        alert('Usuario no encontrado');
        return;
      }
      if (res.status === 404) {
        alert('Usuario no encontrado');
        return;
      }
      if (res.status === 401) {
        alert('Usuario no autorizado');
        return;
      }
      const data = await res.json();

      if (res.status === 200) {
        router.push("/listausuario"); // Redirigir si las credenciales son correctas
        console.log('Usuario logueado:' + res.status, data);
      }

    } catch (error) {
      console.error('Ocurrió un error al intentar logear al usuario:', error);
      //  mostrar un mensaje
      alert('Ocurrió un error al intentar iniciar sesión, por favor intenta nuevamente.');
    }
  }

  async function agregarUsuario(usuario: Usuario) {
    try {
      let res;
      if (id_usuario == 0) {
        res = await fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id_usuario: usuario.id_usuario,
            nombre_usuario: usuario.nombre_usuario,
            contrasena: usuario.contrasena,
            nombre_completo: usuario.nombre_completo,
            unidad_area: usuario.unidad_area,
            administrador: usuario.administrador

          })
        })
      }
      else {

        res = await fetch('http://localhost:5000/users/' + id_usuario, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id_usuario: usuario.id_usuario,
            nombre_usuario: usuario.nombre_usuario,
            contrasena: usuario.contrasena,
            nombre_completo: usuario.nombre_completo,
            unidad_area: usuario.unidad_area,
            administrador: usuario.administrador
          })
        })
      }


      if (!res) {
        alert('Ocurrio un error')
        return
      }

      alert('Agregado exitosamente')


    } catch (error) {
      alert('Ocurrio un error en la peticion' + error)
    }

  }


  function actualizarUsuario(id_usuario: number, nombre_usuario: string, contrasena: string, nombre_completo: string, unidad_area: string, administrador: boolean) {
    setId(id_usuario)
    setNombreUsuario(nombre_usuario)
    setContrasena(contrasena)
    setNombreCompleto(nombre_completo)
    setUnidadArea(unidad_area)
    setAdministrador(administrador)
  }

  async function eliminarUsuario(id_usuario: number) {

    try {

      const res = await fetch('http://localhost:5000/users/' + id_usuario, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!res) {
        alert('Ocurrio un error')
        return
      }

      cargarUsuarios()
      alert('Eliminado exitosamente')

    } catch (error) {
      alert('Ocurrio un error en la peticion' + error)
    }
  }
  return (
    <usuarioContext.Provider value={{
      usuario,
      setUsuario, agregarUsuario,
      actualizarUsuario,
      eliminarUsuario,
      id_usuario, setId,
      nombre_usuario, setNombreUsuario,
      contrasena, setContrasena,
      nombre_completo, setNombreCompleto,
      unidad_area, setUnidadArea,
      administrador, setAdministrador,
      logearUsuario

    }}>
      {children}
    </usuarioContext.Provider>
  )
}

export function useUsuaarioContext() {
  return useContext(usuarioContext)
}
function then(arg0: (response: any) => any) {
  throw new Error('Function not implemented.')
}

