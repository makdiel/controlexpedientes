'use client'
import React, { useState } from 'react'
import { useHistorialContext } from '../Provider/ProviderHistorial'

export default function HistorialExpedienteComponent() {
  const { obtenerHistorialExpediente, historial } = useHistorialContext()
  const [numeroExpediente, setNumeroExpediente] = useState('')
  const [expediente, setExpediente] = useState<any>(null)

  const handleBuscar = async () => {
    if (numeroExpediente.trim() === '') {
      alert('Por favor, ingrese un número de expediente')
      return
    }
    try {
      const res = await fetch(`http://localhost:5000/historial/expediente/${numeroExpediente}`)
      const data = await res.json()
      setExpediente(data.expediente) // Guardar los datos del expediente
      obtenerHistorialExpediente(numeroExpediente) // Obtener historial
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
              value={numeroExpediente}
              onChange={(e) => setNumeroExpediente(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleBuscar}>
              Buscar
            </button>
          </div>
        </div>
      </div>

      {expediente && (
        <div className="mt-4">
          <table className="table table-bordered table-hover text-center">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Expediente</th>
                <th>Establecimiento</th>
                <th>Usuario</th>
                <th>Unidad Área Usuario</th>
                <th>Fecha Transferencia</th>
                <th>Comentario</th>
              </tr>
            </thead>
            <tbody>
              {historial.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td><strong>{expediente.numero_expediente}</strong></td>
                  <td>{expediente.nombre}</td>
                  <td className="text-success fw-bold">{item.Usuario?.nombre_completo || 'Desconocido'}</td>
                  <td>{item.Usuario?.unidad_area || 'No asignado'}</td>
                  <td>{new Date(item.fecha_transferencia).toLocaleDateString()}</td>
                  <td>{item.comentario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
