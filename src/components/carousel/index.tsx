import React, { useRef, useState, useEffect } from "react";
import classnames from 'classnames'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import './index.scss'

interface CarouselProps {
    children: React.ReactNode[];
    slidesToShow?: number; // 可选，显示的幻灯片数量
    carouselItemCls ?: string;
    // 是否开启自动播放，默认为true
    autoPlay ?: boolean;
    // 自动播放间隔时间，单位为毫秒
    intervals?: number;
}
type AnimationClsType = 'left-in'|'left-out'|'right-in'|'right-out'|''

const Carousel: React.FC<CarouselProps> = (props) => {
    const { children, slidesToShow=1, carouselItemCls, autoPlay=true, intervals=3000 } = props
    const carouselRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timer | null>(null);

    const [startIndex, setStartIndex] = useState(0);
    const [currentSlides, setCurrentSlides] = useState(() => children.slice(0, slidesToShow));
    const [nextIndex, setNextIndex] = useState(0);
    const [nextSlides, setNextSlides] = useState<React.ReactNode[]>([]);

    const totalSlides = children.length;
    const widthStyle = 100 / slidesToShow

    const [animationCls, setAnimationCls] = useState<AnimationClsType>("")

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const updateIndexAfterAnimation = (newIndex: number, animationClassIn: AnimationClsType, animationClassOut: AnimationClsType) => {
        //先更新
        setNextSlides(children.slice(newIndex, newIndex + slidesToShow));
        setNextIndex(newIndex);
        setAnimationCls(animationClassOut);
        timeoutRef.current = setTimeout(() => {
            setStartIndex(nextIndex);
            setCurrentSlides(nextSlides)
            setAnimationCls(animationClassIn); // 清除动画类名
        }, 500); // 假设动画持续时间是 500ms
    };

    const goNext = () => {
        const newIndex = (startIndex + slidesToShow) % totalSlides;
        updateIndexAfterAnimation(newIndex, "right-in", "left-out");
    };

    const goPrev = () => {
        const newIndex = (startIndex - slidesToShow + totalSlides) % totalSlides;
        updateIndexAfterAnimation(newIndex, "left-in", "right-out");
    };

    useEffect(() => {
        let observer: IntersectionObserver | null = null
        if (autoPlay) {
            observer = new IntersectionObserver((entries) => {
                if(entries[0].isIntersecting) {
                    intervalRef.current = setInterval(goNext, intervals)
                } else {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current)
                    }
                }
            })
            if (carouselRef.current !== null) {
                observer.observe(carouselRef.current)
            }
        }
        
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
            if (carouselRef.current && observer) {
                observer.unobserve(carouselRef.current)
            }
        }
    }, [])


    const slides = nextIndex === startIndex ? currentSlides : nextSlides

    return (
        <div className="carousel-container" ref={carouselRef} style={{ overflow: 'hidden', width: '100%' }}>
          <div className={`carousel-inner ${animationCls}`}>
            {slides.map((child, index) => (
                <div key={index} className={classnames('carousel-item', carouselItemCls)} style={{ width: `${widthStyle}%` }}>
                    {child}
                </div>
            ))}
          </div>
          <button className="carousel-arrow prev" onClick={goPrev}><ArrowCircleLeftOutlinedIcon sx={{ fontSize: 40 }} /></button>
          <button className="carousel-arrow next" onClick={goNext}><ArrowCircleRightOutlinedIcon sx={{ fontSize: 40 }} /></button>
        </div>
      );
}

export default Carousel;