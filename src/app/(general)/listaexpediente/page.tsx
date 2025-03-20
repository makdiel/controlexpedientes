'use client'
import ListaExpedienteComponent from '@/app/Components/ListaExpedienteComponent'
import { useExpedienteContext } from '@/app/Provider/ProviderExpediente'
import { useSearchParams } from 'next/navigation'; //me sirve para recibir parametros
import 'bootstrap/dist/css/bootstrap.min.css';
import CentralImage from '@/app/Components/CentralImage'; //importar el componete que contiene el logo


import Link from 'next/link'
import React, { useState } from 'react'

export default function page() {

  const searchParams = useSearchParams(); //variable para recibir los parametros que vienen desde provider usuario
  const { expediente } = useExpedienteContext();
  const unidad = useState('')
  // Accediendo a los parámetros de la URL
  const us = searchParams.get('us');
  //const unidad_area = searchParams.get('unidad_area');
  return (
    <>
     
    <div className="container mt-5">
    <div className="center-container">
    <CentralImage /> 
    </div>
      {/* Caja para mostrar los datos en la parte superior derecha 
      <h5 className="card-title">Datos del Usuario</h5>
      */}
      <div className="position-absolute bottom-0 end-0 p-3">
        <div className="card" style={{ width: '18rem' }}>
          <div className="card-body">
            
            <p className="card-text">
              <strong>User :</strong> {us}
            </p>
            <p className="card-text">
           
            </p>
          </div>
        </div>
      </div>
    </div>
      <ListaExpedienteComponent></ListaExpedienteComponent>
    </>
  )
}