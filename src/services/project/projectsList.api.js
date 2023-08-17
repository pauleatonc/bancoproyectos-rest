import axios from  'axios'

const apiProjectsList = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL_LISTA_PROYECTOS,
});

export default apiProjectsList;