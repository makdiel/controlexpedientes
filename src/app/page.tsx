'use client'
import { useUsuaarioContext } from "./Provider/ProviderUsuario";
import { useState } from "react";

export default function page() {
 
  const [error, setError] = useState(null);
    const {
      nombre_usuario,setNombreUsuario,
      contrasena,setContrasena,
      logearUsuario}= useUsuaarioContext()
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
    // creo un json para enviar los parametros por el metodo post
    const usuario: Usuario={
      nombre_usuario:nombre_usuario,
      contrasena:contrasena
    }
    await logearUsuario(usuario)
   
   // router.push("/listausuario"); // Redirigir si las credenciales son correctas
   /* if (nombre_usuario === "" && contrasena === "") {
      router.push("/listausuario"); // Redirigir si las credenciales son correctas
      //<Link href='/listausuario' className="btn btn-primary">Logearse</Link>
    } else {
      setError("Correo o contraseña incorrectos");
    }*/
      
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.error('Error al logear usuario:', error);
      alert('Hubo un error al intentar loguearte. Por favor, intenta nuevamente.');
    }
   // <Link href='/listausuario' className="btn btn-primary">Logearse</Link>
    
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc" }}>
          <h2>Iniciar sesión</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="Usuario">Nombre de usuario</label>
              <input
                type="nombre_usuario"
                id="nombre_usuario"
                name="nombre_usuario"
                value={nombre_usuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                required
                placeholder="Nombre del Usuario"
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              />
            </div>
            <div>
              <label htmlFor="contrasena">Contraseña</label>
              <input
                type="contrasena"
                id="contrasena"
                name="contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
                placeholder="Contraseña"
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              />
            </div>
            <button className='btn btn-success' type="submit" style={{ padding: "10px 20px" }}>Iniciar sesión</button>
          </form>
        </div>
      </main>
    </div>
  );
}
