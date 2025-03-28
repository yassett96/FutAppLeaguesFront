/**
 * URL base de la API
 * Dependiendo del entorno (`NODE_ENV`), selecciona la URL adecuada:
 * - En producción: se utiliza la URL de Elastic Beanstalk.
 * - En desarrollo: se utiliza la URL local (localhost).
 */
export const API_URL =
    process.env.NODE_ENV === 'production'
        ? 'https://api.ligasfutapp.com'
        : 'http://localhost:3001';

/**
 * Roles de usuarios del sistema
 * Define un conjunto de roles de usuario para gestionar los permisos y accesos en la aplicación.
 * - `JUGADOR`: Rol para el usuario jugador de un equipo.
 * - `DELEGADO`: Rol para el usuario encargado de gestionar un equipo específico.
 * - `PLANILLERO`: Rol para el usuario encargado de registrar eventos y datos del partido. 
 * - `HINCHA`: Rol para el usuario fanático o espectador. 
 * - `ADMIN_MAESTRO`: Rol para el administrador maestro del sistema.
 * - `ADMIN_LIGA`: Rol para el administrador de una liga en específico.
 */
export const USER_ROLES = {
    JUGADOR: 'Jugador',
    DELEGADO: 'Delegado',
    PLANILLERO: 'Planillero',
    HINCHA: 'Hincha',
    ADMIN_MAESTRO: 'Admin_Maestro',
    ADMIN_LIGA: 'Admin_Liga',
};

/**
 * IDs de Roles de usuarios del sistema
 * Define un conjunto de roles de usuario asociados con sus IDs correspondientes para gestionar los permisos y accesos en la aplicación.
 * - `JUGADOR`: ID del rol para el usuario jugador de un equipo.
 * - `DELEGADO`: ID del rol para el usuario encargado de gestionar un equipo específico.
 * - `PLANILLERO`: ID del rol para el usuario encargado de registrar eventos y datos del partido.
 * - `HINCHA`: ID del rol para el usuario fanático o espectador.
 * - `ADMIN_MAESTRO`: ID del rol para el administrador maestro del sistema.
 * - `ADMIN_LIGA`: ID del rol para el administrador de una liga en específico.
 */
export const IDS_USER_ROLE = {
    JUGADOR: 1, // ID correspondiente al rol de Jugador
    DELEGADO: 2, // ID correspondiente al rol de Delegado
    PLANILLERO: 3, // ID correspondiente al rol de Planillero
    HINCHA: 4, // ID correspondiente al rol de Hincha
    ADMIN_MAESTRO: 5, // ID correspondiente al rol de Admin Maestro
    ADMIN_LIGA: 6, // ID correspondiente al rol de Admin Liga
};

/**
 * Tipos de eventos de partidos
 * Define un conjunto de tipos de eventos que pueden ocurrir durante un partido de fútbol.
 * - `GOL`: Indica un gol anotado en el partido.
 * - `ASISTENCIA`: Registra una asistencia de un jugador en un gol.
 * - `TARJETA_AMARILLA`: Evento que asigna una tarjeta amarilla a un jugador.
 * - `TARJETA_ROJA`: Evento que asigna una tarjeta roja a un jugador (expulsión).
 * - `LESION`: Evento que indica una lesión de un jugador.
 * - `FALTA`: Registra una falta cometida por un jugador.
 * - `INICIO_DEL_PARTIDO`: Marca el inicio oficial del partido.
 * - `FIN_DEL_PRIMER_TIEMPO`: Indica el final de la primera mitad.
 * - `INICIO_DEL_SEGUNDO_TIEMPO`: Marca el inicio de la segunda mitad del partido.
 * - `FIN_DEL_PARTIDO`: Marca el final oficial del partido.
 * - `SUSTITUCION`: Indica una sustitución de jugadores durante el partido.
 */
export const EVENT_TYPES = {
    GOL: 'Gol',
    ASISTENCIA: 'Asistencia',
    TARJETA_AMARILLA: 'Tarjeta Amarilla',
    TARJETA_ROJA: 'Tarjeta Roja',
    LESION: 'Lesión',
    FALTA: 'Falta',
    INICIO_DEL_PARTIDO: 'Inicio del Partido',
    FIN_DEL_PRIMER_TIEMPO: 'Fin del Primer Tiempo',
    INICIO_DEL_SEGUNDO_TIEMPO: 'Inicio del Segundo Tiempo',
    FIN_DEL_PARTIDO: 'Fin del Partido',
    SUSTITUCION_ENTRA: 'Sustitución Entra',
    SUSTITUCION_SALE: 'Sustitución Sale',
    AUTO_GOL: 'Auto-Gol',
};

/**
 * Etapas Play-Off
 * Define los nombres del conjuto de etapas en los Play-Offs
 * - `FINAL`: Indica la etapa final del torneo.
 * - `SEMI_FINAL`: Indica la etapa semi final del torneo.
 * - `CUARTOS_DE_FINAL`: Indica la etapa cuartos de final del torneo.
 * - `OCTAVOS_DE_FINAL`: Indica la etapa octavos de final del torneo.
 * - `DIECISEISAVO_DE_FINAL`: Indica la etapa dieciseisavo de final del torneo.
 * - `TREINTAIDOSAVO_DE_FINAL`: Indica la etapa treintaidosavo de final del torneo.
 */
export const ETAPAS_PLAY_OFF = {
    FINAL: 'Final',
    SEMI_FINAL: 'Semi final',
    CUARTOS_DE_FINAL: 'Cuartos de final',
    OCTAVOS_DE_FINAL: 'Octavos de final',
    DIECISEISAVO_DE_FINAL: 'Dieciseisavo de final',
    TREINTAIDOSAVO_DE_FINAL: 'Treintaidosavo de final',
};

/**
 * Tipos Torneo
 * Define los nombres de los tipos de torneos
 * - `PLAY_OFF`: Indica el tipo de torneo Play-Off.
 * - `LIGA`: Indica el tipo de torneo Liga.
 * - `LIGA_PLAY_OFF`: Indica el tipo de torneo Liga/Play-Off.
 */
export const TIPOS_TORNEOS = {
    PLAY_OFF: 'Play-Off',
    LIGA: 'Liga',
    LIGA_PLAY_OFF: 'Liga/Play-Off'
};

/**
 * Estados de los Partidos
 * Define los estados que se puede encontrar un partido
 * - `PENDIENTE`: Indica el estado de Pendiente del partido.
 * - `EN_PROCESO`: Indica el estado En proceso del partido.
 * - `FINALIZADO`: Indica el estado de Finalizado del partido.
 * - `SUSPENDIDO`: Indica el estado de Suspendido del partido.
 */
export const ESTADOS_PARTIDOS = {
    PENDIENTE: 'Pendiente',
    EN_PROCESO: 'En Proceso',
    FINALIZADO: 'Finalizado',
    SUSPENDIDO: 'Suspendido'
};