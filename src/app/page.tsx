'use client';
import { useEffect } from 'react';
import { useUsuarioContext } from './Provider/ProviderUsuario';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import CentralImage from './Components/CentralImage';

export default function Page() {
  const router = useRouter();
  const { nombre_usuario, setNombreUsuario, contrasena, setContrasena, logearUsuario, usuarioLogueado,unidad_area, setUnidadArea } = useUsuarioContext();

  useEffect(() => {
    console.log('usuarioLogueado:', usuarioLogueado);
    if (usuarioLogueado) {
      router.push('/listausuario');
    }
  }, [usuarioLogueado, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre_usuario || !contrasena) {
      alert('Por favor, complete todos los campos.');
      return;
    }
    setNombreUsuario(nombre_usuario)
    await logearUsuario({ nombre_usuario, contrasena } as any);
  };
 

  return (
    <>
    <div className="container mt-5">
    <div className="center-container">
     <CentralImage /> 
     <h2 className="text-center mb-4">CONTROL DE EXPEDIENTES</h2>
    <div className="container d-flex justify-content-center align-items-center min-vh-200">  
      
      <div className="card shadow p-4" style={{ maxWidth: '500px', width: '100%' }}>
        
        <h2 className="text-center mb-4">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre_usuario" className="form-label">Nombre de usuario</label>
            <input
              type="text"
              id="nombre_usuario"
              value={nombre_usuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contrasena" className="form-label">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Iniciar sesión</button>
        </form>
      </div>
    </div>
    </div>
    </div>
    </>
  );
}
