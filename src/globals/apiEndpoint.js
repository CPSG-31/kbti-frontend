import CONFIG from './config';

const API_ENDPOINT = {
  LOGIN: `${CONFIG.BASE_URL}/login`,
  REGISTER: `${CONFIG.BASE_URL}/register`,
  DELETE_DEFINITION: (id) => `${CONFIG.BASE_URL}/definitions/${id}`,
  CATEGORY: `${CONFIG.BASE_URL}/categories`,
  CREATE_DEFINITION: `${CONFIG.BASE_URL}/definitions`,

  SEARCH: (query) => `${CONFIG.BASE_URL}/search?q=${query}`,
  GET_DEFINITIONS_BY_TERM: (term) => `${CONFIG.BASE_URL}/definitions?term=${term}`,
  GET_DEFINITIONS_BY_CATEGORY_ID: (categoryId) => `${CONFIG.BASE_URL}/definitions?categoryId=${categoryId}`,
  VOTE_DEFINITION: (id) => `${CONFIG.BASE_URL}/definitions/${id}/votes`,
  ADMIN_DEFINITIONS: (page) => `${CONFIG.BASE_URL}/admin/definitions?page=${page}`,
  USERS: `${CONFIG.BASE_URL}/users`,
  DELETE_USER: (id) => `${CONFIG.BASE_URL}/users/${id}`,
  ADMIN_DEFINITIONS_REVIEW: (page) => `${CONFIG.BASE_URL}/admin/definitions/review?page=${page}`,
};

export default API_ENDPOINT;
