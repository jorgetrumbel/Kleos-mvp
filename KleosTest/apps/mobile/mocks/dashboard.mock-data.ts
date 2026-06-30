export const dashboardStats = {
  athletes: 42,
  plans: 12,
  pendingPayments: 5,
  sessionsToday: 18,
};

export const dashboardMock = {
  coachName: 'Carlos',

  alerts: [
    {
      id: '1',
      text: '3 atletas con mensajes sin respuesta',
      type: 'messages',
    },
    {
      id: '2',
      text: '2 comprobantes pendientes de aprobación',
      type: 'payments',
    },
  ],

  stats: [
    {
      value: '$650.000',
      label: 'Ing. actual',
    },
    {
      value: '$820.000',
      label: 'Proyectado',
    },
    {
      value: '18 / 25',
      label: 'Atletas',
    },
    {
      value: '84%',
      label: 'Completitud',
    },
  ],

  sessions: [
    {
      id: '1',
      emoji: '🏃',
      title: 'Trail Grupal · Hoy 08:00',
    },
  ],
};