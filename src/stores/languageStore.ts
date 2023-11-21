import { makeAutoObservable } from 'mobx'
import { BASE_PATH } from '../config/router'

class LanguageStore {
    language = [{
        isActive: false,
        name: '中文',
        code: 'CH',
    }, {
        isActive: true,
        name: 'English',
        code: 'EN',
    }]
    selectedLanguage = 'CH'
    i18n: {[key:string]: any} = {}
    constructor() {
        makeAutoObservable(this)
        this.loadLanguageData()
    }

    loadLanguageData() {
        fetch(`${BASE_PATH}/data/language.json`)
            .then(response => response.json())
            .then(data => {
                this.i18n = data
            })
    }

    toggleLanguage(code: string) {
        if (this.selectedLanguage === code) return;
        this.selectedLanguage = code
        this.language.forEach(item => {
            if (item.isActive) {
                item.isActive = false
            } else if (item.code === code) {
                item.isActive = true
            }
        })
    } 

    getTranslation(key: string): string {
        const translations = this.i18n[this.selectedLanguage];
        return translations?.[key] || key; // 如果找不到翻译，则返回key本身
    }
}

export default LanguageStore;