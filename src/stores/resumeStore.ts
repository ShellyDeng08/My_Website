import { makeAutoObservable, reaction } from 'mobx'
import { BASE_PATH } from '../config/router'
import RootStore from './rootStore'
import LanguageStore from './languageStore'
 
type ResumeInfoItem = Array<{
    name: string;
    data: Array<any>
}>
interface ResumeInfo {
    [key: string]: ResumeInfoItem
}

type TimelineData = Array<{
    title: string;
    timeRange: string;
    iconUrl: string;
}>

class ResumeStore {
    timelineData: TimelineData = []
    resumeInfo: ResumeInfo = {}
    languageStore: LanguageStore
    constructor(rootStore: RootStore) {
        makeAutoObservable(this)
        this.loadResumeData()
        this.languageStore = rootStore.languageStore
        // 监听语言切换事件
        reaction(() => this.languageStore.selectedLanguage.code,
        (code: string) => {
            this.setTimelineData(code)
        })
        
    }

    loadResumeData = () => {
        fetch(`${BASE_PATH}/data/resume.json`)
            .then(response => response.json())
            .then(data => {
                this.resumeInfo = data
                this.setTimelineData(this.languageStore.selectedLanguage.code)
            })
    }

    setTimelineData = (code: string) => {
        const resumeInfoData = this.resumeInfo[code]
        const educationData = resumeInfoData.find(item => item.name === 'EDUCATION')?.data || []
        const experienceData = resumeInfoData.find(item => item.name === 'EXPERIENCE')?.data || []
        this.timelineData = educationData.map(item => ({
            title: item.schoolName,
            timeRange: `${item.startTime}-${item.endTime}`,
            iconUrl: `${BASE_PATH}${item.iconUrl}`
        })).concat(...(experienceData.map(item => ({
            title: item.companyName,
            timeRange: `${item.startTime}-${item.endTime}`,
            iconUrl: `${BASE_PATH}${item.iconUrl}`
        }))))
    }
}

export default ResumeStore;