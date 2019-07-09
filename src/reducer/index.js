import {combineReducers} from 'redux'
import count from './count'
import list from './list'
import language from './language'
import language_json from './language_json'
import user from './user'

export default combineReducers({
    count,
    list,
    language,
    language_json,
    user,
})
