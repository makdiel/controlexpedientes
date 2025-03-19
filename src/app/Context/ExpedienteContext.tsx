import { createContext } from "react";
import { Expediente } from "../Models/Expediente";

export const expedienteContext= createContext({
    expediente: [] as Expediente[],
    setExpediente: (expediente:Expediente[]) =>{},
    agregarExpediente: (expediente : Expediente ) =>{},
    actualizarExpediente: (
        id_expediente:number,
        numero_expediente:string, 
        nombre_establecimiento:string,
        region_sanitaria:string,
        departamento:string,
        Unidad_area:string,
        estado:boolean,
        fecha_creacion:string,
        id_Usuario:number,
        observaciones:string
    ) =>{},
    obtenerExpedientePorUnidad: (Unidad_area: string) => {}, // Obtiene historial de un expediente específicando la unidad
    eliminarExpediente:(id_expediente:number)=>{},
    id_expediente:0,
    setIdExpediente:(id_expediente:number)=>{},
    id_usuario:0,
    setId:(id_Usuario:number)=>{},
    numero_expediente:'',
    setNumero_expediente:(numero_expediente:string) =>{},
    nombre_establecimiento:'',
    setNombre_establecimiento:(nombre_establecimiento:string) =>{},
    region_sanitaria:'',
    setRegion_sanitaria:(region_sanitaria:string) =>{},
    unidad_area:'',
    setUnidadArea:(unidad_area:string) =>{},
    estado:false,
    setEstado:(estado:boolean) =>{},
    fecha_creacion:'',
    setFecha_creacion:(fecha_creacion:string) =>{},
    departamento:'',
    setDepartamento:(departamento:string) =>{},
    observaciones:'',
    setObservaciones:(observaciones:string) =>{}

})
