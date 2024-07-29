import { makeAutoObservable } from 'mobx'
import { BASE_PATH } from '../config/router'

interface SelectedLanguage {
    isActive: boolean,
    name: string,
    code: string,
}

interface LanguageConfig {
    [key: string]: SelectedLanguage
}
class LanguageStore {
    languageConfig: LanguageConfig = {
        'EN': {
            isActive: true,
            name: 'English',
            code: 'EN',
        },
        'CH': {
            isActive: false,
            name: '中文',
            code: 'CH',
        }
    }
    selectedLanguage: SelectedLanguage = this.languageConfig['EN']
    i18n: {[key:string]: any} = {}
    constructor() {
        makeAutoObservable(this)
        this.loadLanguageData()
    }

    loadLanguageData = () => {
        fetch(`${BASE_PATH}/data/language.json`)
            .then(response => response.json())
            .then(data => {
                this.i18n = data
            })
    }

    toggleLanguage = (code: string) => {
        if (this.selectedLanguage['code'] === code) return;
        this.languageConfig[this.selectedLanguage['code']].isActive = false
        this.languageConfig[code].isActive = true
        this.selectedLanguage = this.languageConfig[code]
        document.documentElement.setAttribute('data-language', code)
    } 

    // 这里推荐用箭头函数，否则在外面调用如果用了const {getTranslation} = languageStore; getTranslation(xxx)
    // 的调用方式，就会导致函数失去上下文
    getTranslation = (key: string): string => {
        const code = this.selectedLanguage.code
        const translations = this.i18n[code];
        return translations?.[key] || key; // 如果找不到翻译，则返回key本身
    }
}

export default LanguageStore;