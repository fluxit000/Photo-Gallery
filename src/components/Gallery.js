import {useContext, useEffect} from "react"
import './gallery.css'
import {galleryAPI} from "../store/galleryAPI"
import fetchPictures from "../store/fetchPictures"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useDispatch, useSelector } from "react-redux"

const Gallery = props =>{
    const pictures = useSelector(s=>s.pictures)
    const isPageLoading = useSelector(s=>s.isPageLoading)
    const isError = useSelector(s=>s.isError)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchPictures(""))
    },[])

    const showPopup = (index)=>{
        dispatch(galleryAPI.setPopupImageId(index))
        dispatch(galleryAPI.setIsPopupShow(true))
    }

    return <div id="picture-container" className={isPageLoading? "loading" : ""}>
    {isError && <div className="error"><img src="/error.png"/><h1>Something go wrong</h1></div>}
    {!isError && pictures.length === 0 && <div className="error"><img src="/error.png"/><h1>Not found any images</h1></div>}

    {pictures.map((picture, index)=>
        <div className="picture-holder" key={picture.id}>
            <LazyLoadImage
            className="picture"
            src={picture.src.original+"?auto=compress&cs=tinysrgb&fit=crop&h=300&w=200"}//portrait
            width={200}
            height={300}
            onClick={()=>!isPageLoading? showPopup(index) : ""}
            alt={picture.alt}
            // placeholderSrc="loading.gif"
            />
            <div className="credits">
                This <a target='blank' href={picture.url}>Photo </a> 
                was taken by <a target='blank' href={picture.photographer_url}>{picture.photographer}</a> on Pexels.
            </div>
        </div>
    )}
    </div>
}

export default Gallery