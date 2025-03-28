export interface Usuario {
    id_usuario: number;
    correo: string;
    primer_nombre?: string;
    segundo_nombre?: string;
    primer_apellido?: string;
    segundo_apellido?: string;
    dni?: string;
    [key: string]: any; // Para cualquier propiedad adicional que pueda tener el usuario
}