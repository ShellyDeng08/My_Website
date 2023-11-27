import {useContext, useEffect} from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../context'
import { Button } from '@mui/material'
import Timeline from '../../components/Timeline'
import useCanvasDrawLine from '../../hooks/useCanvasDrawLine'
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
    useCanvasDrawLine("dynamicCanvas")
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
                <canvas id="dynamicCanvas"></canvas>
                <Timeline />
            </section>
            
            <section className='home-timeline home-basic'>
                <Carousel slidesToShow={1}>
                    {slideImgList.map((item, index) => (
                        <img src={item} key={index} width="100%" className='home-portfolio-img' />
                    ))}
                </Carousel>
            </section>
            <footer className='home-footer'>
                联系方式
            </footer>
        </div>
    )
})

export default Home