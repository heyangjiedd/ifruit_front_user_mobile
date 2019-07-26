import {
    COUNT_ADD,
    COUNT_DELETE,
} from '@/action/index'

export default (state = 0, action) => {
    switch (action.type) {
        case COUNT_ADD:
            return state + 1;
        case COUNT_DELETE:
            return state - 1;
        default:
            return state;
    }
}
