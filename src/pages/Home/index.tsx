import {useContext} from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../context'
import { Button } from '@mui/material'

import "./index.scss"
const Home = observer(() => {
    const { languageStore, userInfoStore } = useContext(RootStoreContext)
    // console.log(rootStore)
    return (
        <div className="home">
            <section className="home-welcome">
                <div className='home-self-intro'>
                    <h1>
                    {languageStore.getTranslation('home_welcome')}
                    </h1>
                    <p>{userInfoStore.userInfo.profile}</p>
                    <Button>{languageStore.getTranslation("home_explore")}</Button>
                </div>
                
                <div className='home-avatar'>
                    <img src="/my-website/image/home-avatar.jpg" alt="" />
                </div>
            </section>
            
            <section>
                关键信息
            </section>
            <section>
                作品或博客
            </section>
            <section>
                联系方式
            </section>
        </div>
    )
})

export default Home