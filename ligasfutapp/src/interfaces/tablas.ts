export interface InfoTablaPosiciones {
    equipo: string;
    puntos: number;
    partidos_jugados: number;
    partidos_ganados: number;
    partidos_empatados: number;
    partidos_perdidos: number;
    goles_a_favor: number;
    goles_en_contra: number;
    diferencia_goles: number;
}

export interface InfoTablaGoleadores {
    id_jugador: number;
    nombre_jugador: string;
    apellido_jugador: string;
    equipo: string;
    goles: number;
    partidos_jugados: number;
}

export interface InfoTablaSancionados {
    nombre_jugador: string;
    equipo: string;
    total_fechas_sancionadas: number;
    fechas_cumplidas: number;
    fechas_pendientes: number;
}

export interface InfoTablaPartido {
    id_partido: number;
    fecha: string;
    hora: string;
    equipo_local: string;
    resultado_local: number;
    equipo_visitante: string;
    resultado_visitante: number;
    estado: string;
    accion: string;
}
