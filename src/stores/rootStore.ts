import LanguageStore from './languageStore'
import UserInfoStore from './userInfoStore'
import ResumeStore from './resumeStore'

class RootStore {
    languageStore: LanguageStore
    userInfoStore: UserInfoStore
    resumeStore: ResumeStore
    constructor() {
        this.languageStore = new LanguageStore()
        this.userInfoStore = new UserInfoStore(this)
        this.resumeStore = new ResumeStore(this)
    }
}
export const rootStore = new RootStore()
export default RootStore;