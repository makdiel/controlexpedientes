'use client'
import ListaUsuarioComponent from '@/app/Components/ListaUsuarioComponent'
import HistorialDetalladoComponent from '@/app/Components/HistorialDetalladoComponent'
import { useUsuaarioContext } from '@/app/Provider/ProviderUsuario'
import Link from 'next/link'
import React from 'react'

export default function page() {

  const { usuario } = useUsuaarioContext()

  return (
    <>
      <ListaUsuarioComponent Usuarios={usuario}></ListaUsuarioComponent>
      <HistorialDetalladoComponent></HistorialDetalladoComponent>
    </>
  )
}
