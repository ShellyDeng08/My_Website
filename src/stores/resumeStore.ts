import { makeAutoObservable, reaction, flow } from 'mobx'
import { BASE_PATH } from '../config/router'
import RootStore from './rootStore'
import LanguageStore from './languageStore'

enum ResumeType {
    EXPERIENCE = 'experience',
    SKILL = 'skill',
    EDUCATION = 'education'
}

type ExperienceData = Array<{
    companyName: string,
    title: string,
    location: string,
    startTime: string,
    endTime: string, 
    description: string[],
    type: string,
    iconUrl: string,
}>

type EducationData = Array<{
    schoolName: string,
    degree: string,
    major: string,
    startTime: string,
    endTime: string, 
    GPA: string,
    location: string,
    iconUrl: string,
}>

type SkillData = Array<{
    tech: string[],
    language: string[],
}>
type ResumeItem = 
    | { name: ResumeType.EXPERIENCE; data: ExperienceData }
    | { name: ResumeType.EDUCATION; data: EducationData }
    | { name: ResumeType.SKILL; data: SkillData };
type ResumeData = ResumeItem[]

type TimelineData = Array<{
    title: string;
    timeRange: string;
    iconUrl: string;
}>



class ResumeStore {
    timelineData: TimelineData = []
    resumeInfo: ResumeData = []
    private allResumeData: {[key: string]: ResumeData } = {}
    public experienceData: ExperienceData = []
    public educationData: EducationData = []
    public skillData: SkillData = []
    languageStore: LanguageStore
    loading = false;
    constructor(rootStore: RootStore) {
        makeAutoObservable(this)
        this.languageStore = rootStore.languageStore
        this.init()
    }

    private init = () => {
        this.fetchData()
        // 监听语言切换事件
        reaction(() => this.languageStore.selectedLanguage.code,
        (code: string) => {
            this.setData(code)
            this.setTimelineData(code)
        })
    }

    fetchData = flow(function*(this: ResumeStore) {
        this.loading = true
        try {
            const res = yield fetch(`${BASE_PATH}/data/resume.json`)
            const data = yield res.json()
            this.allResumeData = data
            this.setData(this.languageStore.selectedLanguage.code)
        } catch(e) {
            console.error('Get Resume Error:', e)
        } finally {
            this.loading = false
        }
    })

    setData = (code: string) => {
        this.resumeInfo = this.allResumeData[code]
        this.experienceData = (this.resumeInfo.find(item => item.name === ResumeType.EXPERIENCE)?.data || []) as ExperienceData
        this.educationData = (this.resumeInfo.find(item => item.name === ResumeType.EDUCATION)?.data || []) as EducationData
        this.skillData = (this.resumeInfo.find(item => item.name === ResumeType.SKILL)?.data || []) as SkillData
    }


    setTimelineData = (code: string) => {
        const resumeInfoData = this.resumeInfo
        const educationData = (resumeInfoData.find(item => item.name === ResumeType.EDUCATION)?.data || []) as EducationData
        const experienceData = (resumeInfoData.find(item => item.name === ResumeType.EXPERIENCE)?.data || []) as ExperienceData
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