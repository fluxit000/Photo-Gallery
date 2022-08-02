import { LazyLoadImage } from 'react-lazy-load-image-component'
import './popup.css'
import galleryAPI from "../store/galleryAPI"
import { useContext, useEffect, useState } from 'react'

const Popup = ({state}) =>{
    const ctx = useContext(galleryAPI)
    const [imageChange, setImageChange] = useState(false)

    const [imageIsLoad, setImageIsLoad] = useState(false)

    const onImageChange = ()=>{
        setImageIsLoad(true)
    }

    useEffect(()=>{
        if(!imageIsLoad){
            setImageChange(true)
            setTimeout(()=>{
                setImageChange(false)
            },780)
        }
    },[imageIsLoad])

    const onBackgroundClick = e =>{
        if(e.target.id === "popup"){
            ctx.setIsPopupShow(false)
        }
    }

    const switchImage = direction=>{
        if(imageChange){
            return
        }
        if(direction === "left"){
            if(ctx.popupImageId === 0){
                ctx.setPopupImageId(ctx.pictures.length-1, onImageChange())
            }
            else{
                ctx.setPopupImageId((currentVal)=>{return currentVal-1}, onImageChange())
            }
        }
        else{
            if(ctx.popupImageId === ctx.pictures.length-1){
                ctx.setPopupImageId(0, onImageChange())
            }
            else{
                ctx.setPopupImageId((currentVal)=>{return currentVal+1}, onImageChange())
            }
        }
    }

    useEffect(()=>{
        const onArrowClick = e =>{
            if(e.code === "ArrowRight"){
                switchImage("right")
            }
            else if(e.code === "ArrowLeft"){
                switchImage("left")
            }
        }

        window.addEventListener('keydown', onArrowClick)

        return ()=> window.removeEventListener('keydown', onArrowClick)
    },[ctx.popupImageId, imageChange])
    

    return <div id='popup' className={state === "exiting"? "popup-close": "popup-open"} onClick={onBackgroundClick}>
        <button className='left' onClick={()=>switchImage("left")}></button>
        <LazyLoadImage
        className={(imageChange? "popup-image-change": "")}
        src={ctx.pictures[ctx.popupImageId].src.portrait}
        height={1200}
        width={600}
        onLoad={()=>{setImageIsLoad(false)}}
        />
        <button className='right' onClick={()=>switchImage("right")}></button>
    </div>
}

export default Popup