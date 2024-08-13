import { observer } from 'mobx-react-lite'
import {useContext, useEffect} from 'react'
import { RootStoreContext } from '../../../context'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineConnector from '@mui/lab/TimelineConnector'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'

const Experience = observer(() => {
    const { languageStore, resumeStore } = useContext(RootStoreContext)
    
    const { timelineData } = resumeStore
    console.log(timelineData)
    return (
        <section className='experience'>
            <h1 className={"text-4xl py-8"}>{languageStore.getTranslation('experience_title')}</h1>
            <Timeline position='alternate'>
                {timelineData.map((item, index) => (
                    <>
                        <TimelineItem>
                            {/* <TimelineContent 
                                sx={{m: 'auto 0'}}
                                align='left'>
                                <Typography>
                                {item.timeRange}
                                </Typography>
                                
                            </TimelineContent> */}
                            <TimelineSeparator>
                                <TimelineConnector style={{minHeight: 20}} />
                                <TimelineDot style={{border: 'none', padding: 0}}>
                                    <img src={item.iconUrl} alt={item.title} className="w-12" />
                                </TimelineDot>
                            </TimelineSeparator>
                            <TimelineContent>
                                <div>
                                    <p>{item.timeRange}</p>
                                    <p>{item.companyName} {item.title}</p>
                                    <Button>Visit Website</Button>
                                </div>
                            </TimelineContent>
                        </TimelineItem>
                    </>
                    
                ))}
            </Timeline>
        </section>
    )
})

export default Experience