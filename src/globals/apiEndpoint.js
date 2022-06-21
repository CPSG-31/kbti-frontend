import CONFIG from './config';

const API_ENDPOINT = {
  LOGIN: `${CONFIG.BASE_URL}/login`,
  REGISTER: `${CONFIG.BASE_URL}/register`,
  CHECK_TOKEN: `${CONFIG.BASE_URL}/auth/token`,
  DELETE_DEFINITION: (id) => `${CONFIG.BASE_URL}/definitions/${id}`,
  CATEGORIES: `${CONFIG.BASE_URL}/categories`,
  CREATE_DEFINITION: `${CONFIG.BASE_URL}/definitions`,
  UPDATE_DEFINITION: (id) => `${CONFIG.BASE_URL}/definitions/${id}`,
  DEFINITION: (id) => `${CONFIG.BASE_URL}/definitions/${id}`,
  SEARCH: (query) => `${CONFIG.BASE_URL}/search?q=${query}`,
  GET_DEFINITIONS_BY_TERM: (term) => `${CONFIG.BASE_URL}/definitions?term=${term}`,
  GET_DEFINITIONS_BY_CATEGORY_ID: (categoryId) => `${CONFIG.BASE_URL}/definitions?categoryId=${categoryId}`,
  VOTE_DEFINITION: (id) => `${CONFIG.BASE_URL}/definitions/${id}/vote`,
  ADMIN_DEFINITIONS: (page) => `${CONFIG.BASE_URL}/admin/definitions?page=${page}`,
  USERS: (page) => `${CONFIG.BASE_URL}/users?page=${page}`,
  DELETE_USER: (id) => `${CONFIG.BASE_URL}/users/${id}`,
  ADMIN_DEFINITIONS_REVIEW: (page) => `${CONFIG.BASE_URL}/admin/definitions/review?page=${page}`,
  ADMIN_DETAIL_DEFINITION_REVIEW: (id) => `${CONFIG.BASE_URL}/definitions/${id}`,
  ADMIN_ACTION_DEFINITION_REVIEW: (id) => `${CONFIG.BASE_URL}/admin/definitions/${id}/review`,
  ADMIN_DEFINITIONS_DELETED: (page) => `${CONFIG.BASE_URL}/admin/definitions/deleted?page=${page}`,
  ADMIN_ACTION_DEFINITION_DELETE: (id) => `${CONFIG.BASE_URL}/admin/definitions/${id}/delete`,
  ADMIN_DETAIL_USER: (id) => `${CONFIG.BASE_URL}/users/${id}`,
  ADMIN_ACTION_UPDATE_USER: (id) => `${CONFIG.BASE_URL}/users/${id}/role`,
  GET_RANDOM_DEFINITIONS: `${CONFIG.BASE_URL}/terms/random`,
  GET_NEWLY_ADDED_TERMS: `${CONFIG.BASE_URL}/terms/new`,
  DASHBOARD: `${CONFIG.BASE_URL}/dashboard`,
};

export default API_ENDPOINT;
