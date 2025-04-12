import axios, { AxiosRequestConfig } from 'axios'

const TOKEN =
  '22860eee009e37f1e3a212a7b50072817a598866850883912ec0a27e93442b5e418491fb438c6d5767c11f72e21a278ae2c81438565aa763e81b20cfd01715676be98c0eb09bb228016fc02399697712b19809012e088e361f5ab1a73d010469ed15a4ed795af6603f606f35c1e1e28cdc3fd52ff6f0200ea5df990fdb73e591'

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    'http://173.249.12.174/desa-wisata-strapi/api', // pastikan sudah diset di .env.local
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Optional: Tambahkan interceptor jika perlu
api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${TOKEN}`
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // kamu bisa handle error global di sini
    console.error('API error:', error)
    return Promise.reject(error)
  },
)

// Fungsi helper umum
export const get = <T = any>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => api.get(url, config).then((res) => res.data)

export const post = <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T> => api.post(url, data, config).then((res) => res.data)

export const put = <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T> => api.put(url, data, config).then((res) => res.data)

export const del = <T = any>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => api.delete(url, config).then((res) => res.data)

export default api
