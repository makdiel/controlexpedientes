'use client'
import React, { useState } from 'react'
import { useHistorialContext } from '../Provider/ProviderHistorial'
import { useExpedienteContext } from '../Provider/ProviderExpediente'
import { Expediente } from '../Models/Expediente'

interface ExpedienteLista{
    Expedientes: Expediente[]
    
}
//{Expedientes}:ExpedienteLista
export default function ListaExpedienteComponent() {
  const { eliminarExpediente, actualizarExpediente,agregarExpediente,obtenerExpedientePorUnidad,expediente } = useExpedienteContext()
  const [id_expediente, setIdExpediente] = useState('')
  const [numeroExpediente, setNumeroExpediente] = useState('')
  const [nombre_establecimiento, setNombre_establecimiento] = useState('')
  const [region_sanitaria, setRegion_sanitaria] = useState('')
  const [unidad, setUnidadArea] = useState('')
  const [fecha_creacion, setFecha_creacion] = useState('')
  const [estado, setEstado] = useState('')
  const [departamento, setDepartamento] = useState('')
  const [observaciones, setObservaciones] = useState('')
  const [expedient, setExpediente] = useState<Expediente[]>([]);

  const handleBuscar = async () => {
    if (unidad.trim() === '') {
      alert('Por favor, ingrese una unidad area')
      return
    }
    try {
      const res = await fetch(`http://localhost:5000/expedientes/unidad/${unidad}`)
      const data = await res.json()
      
      obtenerExpedientePorUnidad(unidad) // Obtener historial
      setExpediente(data) // Guardar los datos del expediente
      console.log(expedient)
     // cargarExpedientes()
      //alert(' obtener expediente: ' )
    } catch (error) {
      alert('Error al obtener el historial del expediente: ' + error)
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary fw-bold">Historial de Expedientes</h2>

      <div className="row justify-content-center mt-3">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Ingrese el número de expediente"
              value={unidad}
              onChange={(e) => setUnidadArea(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleBuscar}>
              Buscar
            </button>
          </div>
        </div>
      </div>

      {expedient && (
        <div className="mt-4">
          <table className="table table-bordered table-hover text-center">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Expediente</th>
                <th>Establecimiento</th>
                <th>Region Sanitaria</th>
                <th>Unidad Área Usuario</th>
                <th>Fecha Creacion</th>
                <th>Departamento</th>
               
              </tr>
            </thead>
            <tbody>
              {expedient.map((item,index) => (
                <tr key={item.id_expediente}>
                  <td>{index + 1}</td>
                  <td><strong>{item.numero_expediente}</strong></td>
                  <td>{item.nombre_establecimiento}</td>
                  <td className="text-success fw-bold">{item.region_sanitaria || 'Desconocido'}</td>
                  <td>{item.unidad_area || 'No asignado'}</td>
                  <td>{new Date(item.fecha_creacion).toLocaleDateString()}</td>
                  <td>{item.departamento}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

