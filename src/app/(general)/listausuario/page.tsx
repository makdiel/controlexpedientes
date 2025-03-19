'use client'
import ListaUsuarioComponent from '@/app/Components/ListaUsuarioComponent'
import HistorialDetalladoComponent from '@/app/Components/HistorialDetalladoComponent'
import HistorialExpedienteComponent from '@/app/Components/HistorialExpedienteComponent'
import { useUsuarioContext } from '@/app/Provider/ProviderUsuario'
import Link from 'next/link'
import React from 'react'

export default function page() {

  const { usuario } = useUsuarioContext()

  return (
    <>
      <ListaUsuarioComponent Usuarios={usuario}></ListaUsuarioComponent>
      <HistorialDetalladoComponent></HistorialDetalladoComponent>
      <HistorialExpedienteComponent></HistorialExpedienteComponent>
    </>
  )
}
