'use client'
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { Historial } from '../Models/Historial'
import { Expediente } from '../Models/Expediente'
import { historialContext } from '../Context/HistorialContext'

interface VistaReact {
  children: ReactNode
}

export default function ProviderHistorial({ children }: VistaReact) {
  const [historial, setHistorial] = useState<Historial[]>([])
  const [id, setId] = useState<number>(0)
  const [id_expediente, setIdExpediente] = useState<number>(0)
  const [id_usuario, setIdUsuario] = useState<number>(0)
  const [fecha_transferencia, setFechaTransferencia] = useState<string>('')
  const [comentario, setComentario] = useState<string>('')
  const [usuario, setUsuario] = useState<{ id_usuario: number; nombre_completo: string }>({
    id_usuario: 0,
    nombre_completo: '',
  })
  const [expediente, setExpediente] = useState<Expediente | null>(null)

  useEffect(() => {
    obtenerHistorial()
  }, [])

  async function obtenerHistorial() {
    try {
      const res = await fetch('http://localhost:5000/historial')
      const data = await res.json()
      setHistorial(data)
    } catch (error) {
      alert('Ocurrió un error al obtener el historial: ' + error)
    }
  }

  async function obtenerHistorialExpediente(numero_expediente: string) {
    try {
      const res = await fetch(`http://localhost:5000/historial/expediente/${numero_expediente}`)
      const data = await res.json()
      setHistorial(data.historial)
    } catch (error) {
      alert('Error al obtener el historial del expediente: ' + error)
    }
  }

  async function obtenerHistorialPorUsuario(id_usuario: number) {
    try {
      const res = await fetch(`http://localhost:5000/historial/expedientes/${id_usuario}`)
      const data = await res.json()
      setHistorial(data)
    } catch (error) {
      alert('Error al obtener el historial del usuario: ' + error)
    }
  }

  async function obtenerHistorialDetallado() {
    try {
      const res = await fetch('http://localhost:5000/historial/detallado')
      const data = await res.json()
      setHistorial(data)
    } catch (error) {
      alert('Error al obtener el historial detallado: ' + error)
    }
  }

  return (
    <historialContext.Provider
      value={{
        historial,
        setHistorial,
        obtenerHistorial,
        obtenerHistorialExpediente,
        obtenerHistorialPorUsuario,
        obtenerHistorialDetallado,
        id,
        setId,
        id_expediente,
        setIdExpediente,
        id_usuario,
        setIdUsuario,
        fecha_transferencia,
        setFechaTransferencia,
        comentario,
        setComentario,
        usuario,
        setUsuario,
        expediente,
        setExpediente,
      }}
    >
      {children}
    </historialContext.Provider>
  )
}

export function useHistorialContext() {
  return useContext(historialContext)
}
