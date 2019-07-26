import enUS from 'antd-mobile/lib/locale-provider/en_US';
import zh from '@/language/zh.json'
import en from '@/language/en.json'
export const languages = [
    {
        value: '中国',
        label: '中国',
        language: undefined,
        lang:'zh',
        langs:zh,

    },
    {
        value: 'English',
        label: 'English',
        language: enUS,
        lang:'en',
        langs:en,
    },
];

export default (state = languages, action) => {
    switch (action.type) {
        default:
            return state;
    }
}
