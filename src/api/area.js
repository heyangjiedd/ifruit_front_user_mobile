import request from '@/utils/request'

export function query(params={}) {
    return request('main/areas',{
        method:'GET',
        params:{...params,
            limit:params.limit||10,
            page:params.page||1}
    })
}

export function queryNoPage(params) {
    return request('main/areas',{
        method:'GET',
        params:{...params,paging:false}
    })
}

export function remove(data) {
    return request(`main/areas${data.id}`,{
        method:'DELETE',
    })
}

export function add(data) {
    return request('main/areas',{
        method:'POST',
        data
    })
}

export function update(data) {
    return request(`main/areas${data.id}`,{
        method:'PUT',
        data
    })
}
