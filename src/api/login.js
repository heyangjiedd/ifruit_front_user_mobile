import request from '@/utils/request'

export function login(data) {
    return request('sys/login',{
        method:'POST',
        data
    })
}
