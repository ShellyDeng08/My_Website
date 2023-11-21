import { makeAutoObservable } from 'mobx'
import { BASE_PATH } from '../config/router'
class UserInfoStore {
    userInfo = {}
    constructor() {
        makeAutoObservable(this)
        this.loadUserInfoData()
    }

    loadUserInfoData() {
        fetch(`${BASE_PATH}/data/userInfo.json`)
            .then(response => response.json())
            .then(data => {
                this.userInfo = data
            })
    }
}

export default UserInfoStore;