const SERVER_URL = 'http://localhost:3001/api';

const SERVER_RESOURCES = {
  USERS: SERVER_URL + '/users',
  AUTH: SERVER_URL + '/auth',
  PATIENTS: SERVER_URL + '/patients',
  STUDIES: SERVER_URL + '/studies',
};

export const SERVER_ENDPOINTS = {
  USERS: {
    BASE_ENDPOINT: SERVER_RESOURCES.USERS,
    BY_ID: (id: string) => `${SERVER_RESOURCES.USERS}/${id}`,
  },
  AUTH: {
    LOG_IN: SERVER_RESOURCES.AUTH + '/log-in',
    LOGGED: SERVER_RESOURCES.AUTH + '/logged',
  },
  PATIENTS: {
    BASE_ENDPOINT: SERVER_RESOURCES.PATIENTS,
    BY_ID: (id: string) => `${SERVER_RESOURCES.PATIENTS}/${id}`,
  },
  STUDIES: {
    BASE_ENDPOINT: (patientId: string) =>
      `${SERVER_RESOURCES.STUDIES}/${patientId}`,
    BY_ID: (patientId: string, id: string) =>
      `${SERVER_RESOURCES.STUDIES}/${patientId}/${id}`,
  },
};
