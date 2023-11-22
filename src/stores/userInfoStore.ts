import { makeAutoObservable, reaction } from 'mobx'
import { BASE_PATH } from '../config/router'
import LanguageStore from './languageStore'
import RootStore from './rootStore'

interface UserInfo {
    userName: string;
    email: string;
    title: string;
    profile: string
}

class UserInfoStore {
    private userInfoData: {[key: string]: UserInfo} = {} 
    userInfo: UserInfo = {} as UserInfo
    languageStore: LanguageStore
    constructor(rootStore: RootStore) {
        makeAutoObservable(this)
        this.loadUserInfoData()
        this.languageStore = rootStore.languageStore
        reaction(() => this.languageStore.selectedLanguage.code,
        (code: string) => {
            this.setUserInfo(code)
        }
        )
    }

    loadUserInfoData() {
        fetch(`${BASE_PATH}/data/userInfo.json`)
            .then(response => response.json())
            .then(data => {
                this.userInfoData = data;
                this.setUserInfo(this.languageStore.selectedLanguage.code)
            })
    }

    setUserInfo(code: string) {
        this.userInfo = this.userInfoData[code]
    }
}

export default UserInfoStore;