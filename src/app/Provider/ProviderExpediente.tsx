'use client'
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { Expediente } from '../Models/Expediente'
import { expedienteContext } from '../Context/ExpedienteContext'
import { useRouter } from 'next/navigation'


interface VistaReact {
  children: ReactNode
}
export default function ProviderExpediente({ children }: VistaReact) {

  const [expediente, setExpediente] = useState<Expediente[]>([]);
  const router = useRouter();
 
  const [id_Usuario, setId] = useState(0)
  const [id_expediente, setIdExpediente] = useState(0)
  const [numero_expediente, setNumero_expediente] = useState('')
  const [nombre_establecimiento, setNombre_establecimiento] = useState('')
  const [region_sanitaria, setRegion_sanitaria] = useState('')
  const [unidad_area, setUnidadArea] = useState('')
  const [estado, setEstado] = useState(false)
  const [fecha_creacion, setFecha_creacion] = useState('')
  const [departamento, setDepartamento] = useState('')
  const [observaciones, setObservaciones] = useState('')



  useEffect(() => {
    cargarExpedientes()
  }, [])

  async function cargarExpedientes() {
    try {

      const res = await fetch('http://localhost:5000/expedientes')
      const data = await res.json()

      setExpediente(data)

    } catch (error) {
      alert('Ocurrio un error en la peticion' + error)
    }
  }

  async function obtenerExpedientePorUnidad(unidad_area: string) {
    try {
      const res = await fetch(`http://localhost:5000/expedientes/unidad/${unidad_area}`)
      const data = await res.json()
      setExpediente(data)
    } catch (error) {
      alert('Error al obtener los expediente: ' + error)
    }
  }
  async function agregarExpediente(expediente: Expediente) {
    try {
      let res;
      if (id_expediente == 0) {
        res = await fetch('http://localhost:5000/expedientes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id_expediente:id_expediente,
            numero_expediente:numero_expediente,
            nombre_establecimiento:nombre_establecimiento,
            region_sanitaria:region_sanitaria,
            departamento:departamento,
            unidad_area:unidad_area,
            estado:estado,
            fecha_creacion:fecha_creacion,
            id_Usuario:id_Usuario,
            observaciones:observaciones

          })
        })
      }
      else {

        res = await fetch('http://localhost:5000/expedientes/' + id_expediente, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id_expediente:id_expediente,
            numero_expediente:numero_expediente,
            nombre_establecimiento:nombre_establecimiento,
            region_sanitaria:region_sanitaria,
            departamento:departamento,
            unidad_area:unidad_area,
            estado:estado,
            fecha_creacion:fecha_creacion,
            id_Usuario:id_Usuario,
            observaciones:observaciones
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

  function actualizarExpediente(
    id_expediente:number,
    numero_expediente:string, 
    nombre_establecimiento:string,
    region_sanitaria:string,
    departamento:string,
    unidad_area:string,
    estado:boolean,
    fecha_creacion:Date,
    id_Usuario:number,
    observaciones:string
){
    setIdExpediente(id_expediente)
    setId(id_Usuario)
    setNumero_expediente(numero_expediente)
    setNombre_establecimiento(nombre_establecimiento)
    setRegion_sanitaria(region_sanitaria)
    setUnidadArea(unidad_area)
    setEstado(estado)
    setFecha_creacion(fecha_creacion)
    setDepartamento(departamento)
    setObservaciones(observaciones)

}

  async function eliminarExpediente(id_expediente: number) {

    try {

      const res = await fetch('http://localhost:5000/expedientes/' + id_expediente, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!res) {
        alert('Ocurrio un error')
        return
      }

      cargarExpedientes()
      alert('Eliminado exitosamente')

    } catch (error) {
      alert('Ocurrio un error en la peticion' + error)
    }
  }
  return (
    <expedienteContext.Provider value={{
      setIdExpediente,id_expediente,
      setId,id_Usuario,
      setNumero_expediente,numero_expediente,
      setNombre_establecimiento,nombre_establecimiento,
      setRegion_sanitaria,region_sanitaria,
      setUnidadArea,unidad_area,
      setEstado,estado,
      setFecha_creacion,fecha_creacion,
      setDepartamento,departamento,
      setObservaciones,observaciones,
      eliminarExpediente,
      actualizarExpediente,
      obtenerExpedientePorUnidad,
      agregarExpediente

    }}>
      {children}
    </expedienteContext.Provider>
  )
}

export function useExpedienteContext() {
  return useContext(expedienteContext)
}
/*
function then(arg0: (response: any) => any) {
  throw new Error('Function not implemented.')
}*/

