export interface Expediente {
    id_expediente: number;
    numero_expediente: string;
    nombre_establecimiento: string;
    region_sanitaria: number;
    departamento: string;
    unidad_area: string;
    estado: boolean; // TRUE = activo, FALSE = finalizado
    fecha_creacion: string; // Usar formato ISO (YYYY-MM-DDTHH:mm:ss.sssZ)
    id_usuario: number; // Relación con Usuario
  }
  