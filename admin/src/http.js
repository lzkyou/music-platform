import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3002/'
})
http.interceptors.request.use(config=>{
  if(localStorage.token){
    config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
  }
  return config
},err=>{
  return Promise.reject(err)
})

export default http