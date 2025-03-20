import React from 'react'
// components/CentralImage.js
import Image from 'next/image';

export default function CentralImage() {
  return (
    <div className="center-container">
      <Image
        src="/logo3.jpg"  // Ruta relativa dentro de la carpeta "public"
        alt="Imagen centrada"
        width={500} // Ajusta el tamaño de la imagen
        height={100} // Ajusta el tamaño de la imagen
      />
    </div>
  );
}