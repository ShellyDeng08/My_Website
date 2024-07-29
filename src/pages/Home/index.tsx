import {useContext, useEffect} from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../context'
import { Button } from '@mui/material'
import { BASE_PATH } from '../../config/router'
import Carousel from '../../components/carousel'
import styles from "./index.module.scss"
import './index.scss'

import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineConnector from '@mui/lab/TimelineConnector'
import Typography from '@mui/material/Typography'


const slideImgList = [
    `${BASE_PATH}/image/slide-trip1.png`,
    `${BASE_PATH}/image/slide-trip2.png`,
    `${BASE_PATH}/image/slide-trip3.png`,
    `${BASE_PATH}/image/slide-trip4.png`
]

const Home = observer(() => {
    const { languageStore, userInfoStore, resumeStore } = useContext(RootStoreContext)
    const { timelineData } = resumeStore
    const blogList = [{
        img: `${BASE_PATH}/image/blog-function.png`,
        title: languageStore.getTranslation("home_blog_3"),
        link: "https://www.jianshu.com/p/9c5809c2f0cb"
    }, {
        img: `${BASE_PATH}/image/blog-timer.png`,
        title: languageStore.getTranslation("home_blog_2"),
        link: "https://www.jianshu.com/p/fe7baef4a1f6"
    }, {
        img: `${BASE_PATH}/image/blog-webpack1.png`,
        title: languageStore.getTranslation("home_blog_1"),
        link: "https://www.jianshu.com/p/8f49aaa6169e"
    }]
    return (
        <div className="home">
            <section className={styles.homeWelcome}>
                <div className={styles.welcomeContainer}>
                    <div>
                        <h1 className={styles.welcomeTitle}>
                        {languageStore.getTranslation('home_welcome')}
                        </h1>
                        <p className={styles.welcomeDesc}>{userInfoStore.userInfo.profile}</p>
                        <Button className={styles.exploreButton} variant="outlined">{languageStore.getTranslation("home_explore")}</Button>
                        
                    </div>
                    
                    <div className={styles.homeAvatar}>
                        <img src={`${BASE_PATH}/image/home-avatar.jpg`} alt="" />
                    </div>

                </div>
            </section>
            <Timeline position='alternate'>
               
                {timelineData.map((item, index) => (
                    <>
                        <TimelineItem>
                            <TimelineContent 
                                sx={{m: 'auto 0'}}
                                align='left'>
                                <Typography>
                                {item.timeRange}
                                </Typography>
                                
                            </TimelineContent>
                            <TimelineSeparator>
                                <TimelineConnector style={{minHeight: 20}} />
                                <TimelineDot style={{border: 'none', padding: 0}}>
                                    <img src={item.iconUrl} alt={item.title} className="w-50" />
                                </TimelineDot>
                            </TimelineSeparator>
                            <TimelineOppositeContent>
                                <Typography>
                                {item.title}
                                </Typography>
                            </TimelineOppositeContent>
                        </TimelineItem>
                    </>
                    
                ))}
            </Timeline>
            
            <section className='home-portfolio home-basic'>
                <div className='home-portfolio-left'>
                    <h2>{languageStore.getTranslation("home_portfolio_title")}</h2>
                    <p>{languageStore.getTranslation("home_portfolio_desc")}</p>
                </div>
                <Carousel slidesToShow={2} autoPlay={false}>
                    {slideImgList.map((item, index) => (
                        <img src={item} key={index} width="100%" className='home-portfolio-img' />
                    ))}
                </Carousel>
            </section>
            <section className='home-blog'>
                {blogList.map((item, index) => (
                    <a key={index} className="home-blog-item" href={item.link} target='_blank'>
                        <img src={item.img} />
                        <span>{item.title}</span>
                    </a>
                ))}
            </section>
            <footer className='home-footer'>
                联系方式
            </footer>
        </div>
    )
})

export default Home