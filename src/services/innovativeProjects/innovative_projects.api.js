import axios from  'axios'

const apiInnovativeProjects = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});

export default apiInnovativeProjects;