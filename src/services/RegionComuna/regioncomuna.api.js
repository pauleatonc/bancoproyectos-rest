import axios from 'axios'

const apiRegionComuna = axios.create({
    // eslint-disable-next-line no-undef
    baseURL: import.meta.env.VITE_REACT_APP_API_URL_REGIONCOMUNA,

});

export default apiRegionComuna; 