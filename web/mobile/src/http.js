import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3001/'
})

http.interceptors.request.use(config => {
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
  }
  return config
}, err => {
  return Promise.reject(err)
})

const upload = axios.create({
  baseURL: 'http://localhost:3002/'
})

upload.interceptors.request.use(config => {
  if (localStorage.token) {
    config.headers.post['Content-Type'] = 'multipart/form-data'
  }
  return config
}, err => {
  return Promise.reject(err)
})

export {http,upload}