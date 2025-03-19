'use client'
import ListaUsuarioComponent from '@/app/Components/ListaUsuarioComponent'
import HistorialDetalladoComponent from '@/app/Components/HistorialDetalladoComponent'
import HistorialExpedienteComponent from '@/app/Components/HistorialExpedienteComponent'
import { useUsuaarioContext } from '@/app/Provider/ProviderUsuario'
import Link from 'next/link'
import React from 'react'
import ListaExpedienteComponent from '@/app/Components/ListaExpedienteComponent'
import { useExpedienteContext } from '@/app/Provider/ProviderExpediente'

export default function page() {

  const { usuario } = useUsuaarioContext()
  const { expediente } = useExpedienteContext()

  //<ListaUsuarioComponent Usuarios={usuario}></ListaUsuarioComponent>
  //  <ListaExpedienteComponent Expedientes={expediente}></ListaExpedienteComponent>

  return (
    <>
      
     
      <HistorialDetalladoComponent></HistorialDetalladoComponent>
      <HistorialExpedienteComponent></HistorialExpedienteComponent>
    </>
  )
}
