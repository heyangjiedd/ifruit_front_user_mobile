import {
    LIST_PUSH,
    LIST_POP,
} from '@/action/index'

export default (state = [], action) => {
    switch (action.type) {
        case LIST_PUSH:
            return [...state,action.text];
        case LIST_POP:
            return state.slice(1,state.length);
        default:
            return state;
    }
}
