import {
    TOGGLE_LANGUAGE,
} from '@/action/language'
import {languages} from './language_json'

export default (state = languages[0], action) => {
    switch (action.type) {
        case TOGGLE_LANGUAGE:
            return languages.find(item=>{
                return item.value === action.data;
            });
        default:
            return state;
    }
}
