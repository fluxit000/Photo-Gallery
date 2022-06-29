import { LazyLoadImage } from 'react-lazy-load-image-component'
import './popup.css'
import galleryAPI from "../store/galleryAPI"
import { useContext } from 'react'

const Popup = props =>{
    const ctx = useContext(galleryAPI)


    const onBackgroundClick = e =>{
        if(e.target.id === "popup"){
            ctx.setPopupImageId(-1)
        }
    }

    const switchImage = e=>{
        const currentIndex = ctx.popupImageId
        if(e.target.className === "left"){
            if(currentIndex === 0){
                ctx.setPopupImageId(ctx.pictures.length-1)
            }
            else{
                ctx.setPopupImageId((currentVal)=>{return currentVal-1})
            }
        }
        else{
            if(currentIndex === ctx.pictures.length-1){
                ctx.setPopupImageId(0)
            }
            else{
                ctx.setPopupImageId((currentVal)=>{return currentVal+1})
            }
        }
    }
    

    return <div id='popup' onClick={onBackgroundClick}>
        <button className='left' onClick={switchImage}></button>
        <LazyLoadImage
        src={ctx.pictures[ctx.popupImageId].src.portrait}
        height={1200}
        width={600}
        />
        <button className='right' onClick={switchImage}></button>
    </div>
}

export default Popup