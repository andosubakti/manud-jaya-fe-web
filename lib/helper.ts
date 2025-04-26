import axios, { AxiosRequestConfig } from 'axios'

const TOKEN =
  'ff6fe8e1e97a774aa03e4be584e9fec990662bd4c24a2f43952d8f51ea0f44fd1c98790dd9c4937de3ef7f3c150aa04e686dface5f67e30893f041a37affde59ab97e8f8eed3dc5c3e5f17fbe03539041f73f298e6ec2fca618b49d0c3e126d1e00ebc947ee4974add2bb0f49cd648d8db2b42e0874c664fa5d6f5e263766700'

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
