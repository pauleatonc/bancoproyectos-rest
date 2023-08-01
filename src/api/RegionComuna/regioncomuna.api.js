import axios from 'axios'

export const getAllRegionComunas = () => {
    return axios.get('http://127.0.0.1:8000/api/region-comuna/')
}