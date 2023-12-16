import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { useRootStore } from '../../hooks/useStore'
import "./index.scss"

const Timeline = observer(() => {
    const { resumeStore } = useRootStore()
    const { timelineData } = resumeStore
    useEffect(() => {
        const handleScroll = () => {
            const timeline = document.querySelector('.timeline ul');
            if (!timeline) return;
            const rect = timeline.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

            if (isVisible) {
                timeline.classList.add('start-animation');
            } else {
                timeline.classList.remove('start-animation')
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    return (
        <div className="timeline">
            
            <ul>
                
                {timelineData.map((item, index) => (
                    <li 
                        className='timeline-item' key={index}
                        style={{ 
                            animationDelay: `${index * 1}s` // 每个元素延迟 0.5 秒
                        }}>
                        <img src={item.iconUrl} alt={item.title} className="timeline-image" />
                        <div className="timeline-content">
                            <h3>{item.title}</h3>
                            <span>{item.timeRange}</span>
                        </div>
                        <span className='timeline-x-line'></span>
                    </li>
                ))}
            </ul>
        </div>
    )
})

export default Timeline