import { observer } from 'mobx-react-lite'
import {useContext, useEffect} from 'react'
import { RootStoreContext } from '../../../context'

const Qualification = observer(() => {
    const { languageStore, resumeStore } = useContext(RootStoreContext)
    const { educationData, skillData } = resumeStore
    console.log(educationData)
    return (
        <section>
            <h1 className={"text-4xl py-8"}>{languageStore.getTranslation('qualification_title')}</h1>
            <h2>Education</h2>
            {educationData.map((item, index) => (
                <div key={index}>
                    <p>{item.schoolName}({item.startTime}-{item.endTime})</p>
                    <p>{item.major}</p>
                </div>
            ))}
            <h2>Skills</h2>

        </section>
    )
})

export default Qualification