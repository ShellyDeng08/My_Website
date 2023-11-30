import { BASE_PATH  } from '../../config/router'
import { useRootStore } from '../../hooks/useStore'

const Resume = () => {
    const { languageStore, userInfoStore } = useRootStore()
    return (
        <div className='resume'>
            <a className='resume-download' href={`${BASE_PATH}/files/xueliandeng+4243455227+software_engineer1.pdf`} download>
                {languageStore.getTranslation("resume_download_button")}
            </a>
        </div>
    )
}

export default Resume