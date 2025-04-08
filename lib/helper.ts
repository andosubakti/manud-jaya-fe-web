import axios, { AxiosRequestConfig } from 'axios'

const TOKEN =
  'ed8e82995e3c4926942631229c49c758edc5f3a3d0f7a90331400ddd088ee40c6634957990dc03d3af3ee9f747a51ff31d7fb793088876abed8e0585cc26471286c1af57383a03ffc9c9d895d64eafc8f6c11cdabaa0a108eb73168a387a1710e201f8e98a3f1ffb6a43eaeb618603d3132ccfead4a6ecff12a9f018fde32b34'

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
