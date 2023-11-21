import LanguageStore from './languageStore'

class RootStore {
    languageStore: LanguageStore
    constructor() {
        this.languageStore = new LanguageStore()
    }
}
export const rootStore = new RootStore()
export default RootStore;