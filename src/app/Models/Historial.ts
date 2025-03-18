import { Expediente } from "./Expediente";
import { Usuario } from "./Usuario";

export interface Historial {
  id: number;
  id_expediente: number;
  id_usuario: number;
  fecha_transferencia: string;
  comentario?: string;
  Usuario?: Usuario; // Datos del usuario que hizo la transferencia
  Expediente?: Expediente; // Datos del expediente
}