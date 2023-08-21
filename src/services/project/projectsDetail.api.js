import axios from  'axios'

const apiProjectsDetail = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL_DETALLES_PROYECTOS,
});

export default apiProjectsDetail;
