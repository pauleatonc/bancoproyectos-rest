import axios from  'axios'

const apiUsers = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});

export default apiUsers;
