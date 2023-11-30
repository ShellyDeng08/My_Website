import {useContext, useEffect} from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../context'
import { Button } from '@mui/material'
import Timeline from '../../components/Timeline'
import { BASE_PATH } from '../../config/router'
import Carousel from '../../components/carousel'
import "./index.scss"

const slideImgList = [
    `${BASE_PATH}/image/slide-trip1.png`,
    `${BASE_PATH}/image/slide-trip2.png`,
    `${BASE_PATH}/image/slide-trip3.png`,
    `${BASE_PATH}/image/slide-trip4.png`
]

const Home = observer(() => {
    const { languageStore, userInfoStore } = useContext(RootStoreContext)
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
            <section className="home-welcome home-basic">
                <div className='home-self-intro'>
                    <h1>
                    {languageStore.getTranslation('home_welcome')}
                    </h1>
                    <p>{userInfoStore.userInfo.profile}</p>
                    <Button>{languageStore.getTranslation("home_explore")}</Button>
                </div>
                
                <div className='home-avatar'>
                    <img src={`${BASE_PATH}/image/home-avatar.jpg`} alt="" />
                </div>
            </section>
            <section className='home-timeline home-basic'>
                <Timeline />
            </section>
            
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