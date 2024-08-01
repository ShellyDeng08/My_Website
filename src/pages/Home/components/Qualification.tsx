import { observer } from 'mobx-react-lite'

const Qualification = observer(() => {
    return (
        <section>
            <h1 className={"text-4xl py-8"}>{languageStore.getTranslation('qualification_title')}</h1>
        </section>
    )
})

export default Qualification