import axios from  'axios'

const apiFilterList = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL_FILTRO_PROYECTOS,
});

export default apiFilterList;