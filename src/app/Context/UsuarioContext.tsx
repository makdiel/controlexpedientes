import { createContext } from "react";
import { Usuario } from "../Models/Usuario";

export const usuarioContext = createContext({
    usuario: [] as Usuario[],
    setUsuario: (usuario: Usuario[]) => {},
    agregarUsuario: (usuario: Usuario) => {},
    logearUsuario: (usuario: Usuario) => {},
    actualizarUsuario: (id_usuario: number, nombre_usuario: string, contrasena: string, nombre_completo: string, unidad_area: string, administrador: boolean) => {},
    eliminarUsuario: (id_usuario: number) => {},
    id_usuario: 0,
    setId: (id_usuario: number) => {},
    nombre_usuario: '',
    setNombreUsuario: (nombre_usuario: string) => {},
    contrasena: '',
    setContrasena: (contrasena: string) => {},
    nombre_completo: '',
    setNombreCompleto: (nombre_completo: string) => {},
    unidad_area: '',
    setUnidadArea: (unidad_area: string) => {},
    administrador: false,
    setAdministrador: (administrador: boolean) => {},

    // ✅ Nuevo estado para el usuario autenticado
    usuarioLogueado: null as Usuario | null,
    setUsuarioLogueado: (usuario: Usuario | null) => {},

    // ✅ Función para cerrar sesión
    cerrarSesion: () => {},
});
