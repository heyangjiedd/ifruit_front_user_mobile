export const USER_ADD = 'USER_ADD'
export const USER_DELETE = 'USER_DELETE'
export const addUser = (data) =>{
    return {
        type:USER_ADD,
        data
    }
}
export const deleteUser = () =>{
    return {
        type:USER_DELETE,
    }
}
