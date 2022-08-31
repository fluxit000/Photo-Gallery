import { LazyLoadImage } from 'react-lazy-load-image-component'
import './popup.css'
import {galleryAPI} from "../store/galleryAPI"
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Popup = ({state}) =>{
    const popupImageId = useSelector(s=>s.popupImageId)
    const pictures = useSelector(s=>s.pictures)

    const dispatch = useDispatch()

    const [imageChange, setImageChange] = useState(false)

    const [imageIsLoad, setImageIsLoad] = useState(false)

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
            dispatch(galleryAPI.setIsPopupShow(false))
        }
    }

    const switchImage = direction=>{
        if(imageChange){
            return
        }
        else{
            setImageIsLoad(true)
        }
        if(direction === "left"){
            if(popupImageId === 0){
                dispatch(galleryAPI.setPopupImageId(pictures.length-1))
            }
            else{
                dispatch(galleryAPI.setPopupImageId((currentVal)=>{return currentVal-1}))
            }
        }
        else{
            if(popupImageId === pictures.length-1){
                dispatch(galleryAPI.setPopupImageId(0))
            }
            else{
                dispatch(galleryAPI.setPopupImageId((currentVal)=>{return currentVal+1}))
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
    },[popupImageId, imageChange])
    

    return <div id='popup' className={state === "exiting"? "popup-close": "popup-open"} onClick={onBackgroundClick}>
        <button className='left' onClick={()=>switchImage("left")}></button>
        <LazyLoadImage
        className={(imageChange? "popup-image-change": "")}
        src={pictures[popupImageId].src.portrait}
        height={1200}
        width={600}
        onLoad={()=>{setImageIsLoad(false)}}
        />
        <button className='right' onClick={()=>switchImage("right")}></button>
    </div>
}

export default Popup