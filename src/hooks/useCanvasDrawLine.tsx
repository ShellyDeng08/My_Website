import { useEffect } from "react";
import { startCanvasDrawing, stopCanvasDrawing } from '../components/Line'


const useCanvasDrawLine = (id: string) => {
    useEffect(() => {
        const targetElement = document.getElementById(id)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCanvasDrawing(targetElement)
                } else {
                    stopCanvasDrawing()
                }
            })
        })
        if (targetElement) {
            observer.observe(targetElement)
        }
        
        return () => {
            if (targetElement) {
                observer.unobserve(targetElement)
            }
            observer.disconnect()
        }
    }, [])
}

export default useCanvasDrawLine;