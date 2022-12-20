import axios from 'axios'

const http =  axios.create({
    baseURL:'http://127.0.0.1:8888/api/private/v1/',
    timeout:5000
})


export default http