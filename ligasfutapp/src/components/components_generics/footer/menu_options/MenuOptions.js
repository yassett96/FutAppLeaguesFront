export const menuOptionsPlanillero = {
  left: [
    { label: 'Home planillero', path: '/user/planner/home_planner', color: 'text-black' },
    { label: 'Firma', path: '/user/planner/match_signature', color: 'text-black' },
    { label: 'Datos', path: '/user/planner/match_data', color: 'text-black' },
  ],
  right: [
    { label: 'Comentarios', path: '/user/planner/match_comment', color: 'text-black' },
    { label: 'Resumen', path: '/user/planner/match_resume_chronology', color: 'text-black' },
    { label: 'Cerrar sesión', path: '/login', color: 'text-black' },
  ],
};

export const menuOptionsJugador = {
  left: [
    { label: 'Mi perfil', path: '/user/player/profile', color: 'text-black' },
    { label: 'Mi equipo', path: '/user/player/my_team', color: 'text-black' },
    { label: 'Torneo', path: '/user/player/tournament', color: 'text-black' },
  ],
  right: [
  ],
};

export const menuOptionsDelegado = {
  left: [
    { label: 'Mi perfil', path: '/user/player/profile', color: 'text-black' },
    { label: 'Mi equipo', path: '/user/player/my_team', color: 'text-black' },
    { label: 'Torneo', path: '/user/player/tournament', color: 'text-black' },
  ],
  right: [
    { label: 'Gestionar', path: '/user/player/manage_team', color: 'text-black' },
  ],
};

export const menuOptionsHincha = {
  left: [
    { label: 'Ligas', path: '/user/hincha/home_hincha', color: 'text-black' }
  ],
  right: [
  ],
};

export const menuOptionsAdminMaster = {
  left: [
    { label: 'Liga', path: '/user/admin_master/league_admin', color: 'text-black' },
  ],
  right: [
    { label: 'Cerrar sesión', path: '/login', color: 'text-black' },
  ],
};

export const menuOptionsAdminLeague = {
  left: [
    { label: 'Categoría', path: '/user/admin_league/category_admin', color: 'text-black' },
    { label: 'Equipo', path: '/user/admin_league/team_admin', color: 'text-black' },
    { label: 'Torneos', path: '/user/admin_league/tournament_admin', color: 'text-black' },
  ],
  right: [
    { label: 'Sancionado', path: '/user/admin_league/sanctioned_admin', color: 'text-black' },
    { label: 'Planillero', path: '/user/admin_league/planner_admin', color: 'text-black' },
    { label: 'Gestionar', path: '/user/admin_league/tournament_admin', color: 'text-black' },
    { label: 'Cerrar sesión', path: '/login', color: 'text-black' },
  ],
};