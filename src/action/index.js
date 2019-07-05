export const COUNT_ADD = 'COUNT_ADD'
export const COUNT_DELETE = 'COUNT_DELETE'
export const LIST_PUSH = 'LIST_PUSH'
export const LIST_POP = 'LIST_POP'
export const addTodo = () =>{
    return {
        type:COUNT_ADD,
    }
}
export const deleteTodo = () =>{
    return {
        type:COUNT_DELETE,
    }
}
export const pushTodo = (text) =>{
    return {
        type:LIST_PUSH,
        text
    }
}
export const popTodo = () =>{
    return {
        type:LIST_POP,
    }
}