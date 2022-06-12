import CONFIG from './config';

const API_ENDPOINT = {
  LOGIN: `${CONFIG.BASE_URL}/login`,
  REGISTER: `${CONFIG.BASE_URL}/register`,
  DELETE_DEFINITION: (id) => `${CONFIG.BASE_URL}/definitions/${id}`,
};

export default API_ENDPOINT;
