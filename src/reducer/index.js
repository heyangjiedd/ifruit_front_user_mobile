import {combineReducers} from 'redux'
import count from './count'
import list from './list'
import language from './language'
import language_json from './language_json'

export default combineReducers({
    count,
    list,
    language,
    language_json,
})