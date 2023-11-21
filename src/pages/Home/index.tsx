import {useContext} from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../context'
import "./index.scss"
const Home = observer(() => {
    const { languageStore } = useContext(RootStoreContext)
    // console.log(rootStore)
    return (
        <div className="home">
            <section className="home-welcome">
                <h1>
                {languageStore.getTranslation('home_welcome')}
                </h1>
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