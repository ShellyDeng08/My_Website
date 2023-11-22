import LanguageStore from './languageStore'
import UserInfoStore from './userInfoStore'

class RootStore {
    languageStore: LanguageStore
    userInfoStore: UserInfoStore
    constructor() {
        this.languageStore = new LanguageStore()
        this.userInfoStore = new UserInfoStore(this)
    }
}
export const rootStore = new RootStore()
export default RootStore;