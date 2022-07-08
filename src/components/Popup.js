import { LazyLoadImage } from 'react-lazy-load-image-component'
import './popup.css'
import galleryAPI from "../store/galleryAPI"
import { useContext, useEffect } from 'react'

const Popup = ({state}) =>{
    const ctx = useContext(galleryAPI)

    console.log(state)

    const onBackgroundClick = e =>{
        if(e.target.id === "popup"){
            ctx.setIsPopupShow(false)
        }
    }

    const switchImage = direction=>{
        if(direction === "left"){
            if(ctx.popupImageId === 0){
                ctx.setPopupImageId(ctx.pictures.length-1)
            }
            else{
                ctx.setPopupImageId((currentVal)=>{return currentVal-1})
            }
        }
        else{
            if(ctx.popupImageId === ctx.pictures.length-1){
                ctx.setPopupImageId(0)
            }
            else{
                ctx.setPopupImageId((currentVal)=>{return currentVal+1})
            }
        }
    }

    useEffect(()=>{
        const onArrowClick = e =>{
            console.log(e)
            if(e.code === "ArrowRight"){
                switchImage("right")
            }
            else if(e.code === "ArrowLeft"){
                switchImage("left")
            }
        }

        window.addEventListener('keydown', onArrowClick)

        return ()=> window.removeEventListener('keydown', onArrowClick)
    },[ctx.popupImageId])
    

    return <div id='popup' className={state === "exiting"? "popup-close": "popup-open"} onClick={onBackgroundClick}>
        <button className='left' onClick={()=>switchImage("left")}></button>
        <LazyLoadImage
        src={ctx.pictures[ctx.popupImageId].src.portrait}
        height={1200}
        width={600}
        />
        <button className='right' onClick={()=>switchImage("right")}></button>
    </div>
}

export default Popup