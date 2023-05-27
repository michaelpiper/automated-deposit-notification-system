import axios from 'axios'
import { App } from '../config'
const api = axios.create(
  {
    baseURL: App.API_BASE_URL
  }
)
export default api
