import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL
const SECONDARY_URL = process.env.REACT_APP_SECONDARY_URL

const instance = axios.create({
  baseURL: BASE_URL,
})

export const secondaryInstance = axios.create({
  baseURL: SECONDARY_URL,
})

export default instance
