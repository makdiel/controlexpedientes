'use client'
import ListaExpedienteComponent from '@/app/Components/ListaExpedienteComponent'
import { useExpedienteContext } from '@/app/Provider/ProviderExpediente'
import Link from 'next/link'
import React from 'react'

export default function page() {


  const { expediente } = useExpedienteContext()

  return (
    <>
      <ListaExpedienteComponent Expedientes={expediente}></ListaExpedienteComponent>
    </>
  )
}