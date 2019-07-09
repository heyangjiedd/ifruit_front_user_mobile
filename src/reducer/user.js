import {
    USER_ADD,
    USER_DELETE,
} from '../action/user'
let user = JSON.parse(localStorage.getItem('user'));
export default (state = user, action) => {
    switch (action.type) {
        case USER_ADD:
            localStorage.setItem('user',JSON.stringify(action.data))
            return action.data;
        case USER_DELETE:
            localStorage.removeItem('user')
            return null;
        default:
            return state;
    }
}
