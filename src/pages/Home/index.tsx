import {useContext, useEffect} from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../context'
import { BASE_PATH } from '../../config/router'
import Carousel from '../../components/carousel'
import './index.scss'


import Footer from '../../components/footer'
import EmailIcon from '@mui/icons-material/Email';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import Qualification from './components/Qualification'
import Experience from './components/Experience'


const slideImgList = [
    `${BASE_PATH}/image/slide-trip1.png`,
    `${BASE_PATH}/image/slide-trip2.png`,
    `${BASE_PATH}/image/slide-trip3.png`,
    `${BASE_PATH}/image/slide-trip4.png`
]

const Home = observer(() => {
    const { languageStore, userInfoStore, resumeStore } = useContext(RootStoreContext)
    const { timelineData } = resumeStore
    const { userInfo } = userInfoStore
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
            <section className={"px-8"}>
                <h1 className={"text-4xl text-center py-8"}>{languageStore.getTranslation('home_welcome')}</h1>
                <div className='flex items-center justify-around'>
                    <div className={"home-avatar"}>
                        <img src={`${BASE_PATH}/image/home-avatar.jpg`} alt="" />
                    </div>
                    <div className='home-personal-card flex flex-col'>
                        <div className='pt-8 px-8'>
                            <p className='text-xl font-bold text-primary pb-3'>{userInfo.userName}</p>
                            <p className='text-sm'>{userInfo.title}</p>
                        </div>
                        <div className='px-8 flex-1'>
                            <div className='personal-card-contact'>
                                <p className='pb-4 pl-6 text-xs'><FmdGoodIcon fontSize="small" className='mr-4'/>{userInfo.address}</p>
                                <p className='pl-6 text-xs'><EmailIcon fontSize="small" className='mr-4'/>{userInfo.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Qualification />
            <Experience />
            {/* <section>
                <h1 className={"text-4xl text-center py-8"}>{languageStore.getTranslation('experience_title')}</h1>
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
            </section> */}
            
            
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
            <Footer />
        </div>
    )
})

export default Home