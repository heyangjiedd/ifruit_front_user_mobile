import axios from 'axios'
import {Toast} from 'antd-mobile'
// create an axios instance
const service = axios.create({
    // baseURL: 'http://118.89.165.170:8081/api/', // url = base url + request url
    // baseURL: 'http://localhost:8081/',
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        Toast.loading('加载中', 0)
        config.url = 'api/' + config.url;
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        // loading.hide()
        const res = response.data
        // if the custom code is not 20000, it is judged as an error.
        if (res.code !== 200) {
            Toast.fail(res.msg);
            return Promise.reject('Error')
        } else {
            Toast.hide()
            return res
        }
    },
    error => {
        Toast.fail(error);
        return Promise.reject(error)
    }
)

export default service
