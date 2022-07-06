import {useContext, useEffect} from "react"
import './gallery.css'
import galleryAPI from "../store/galleryAPI"
import { LazyLoadImage } from "react-lazy-load-image-component"

const Gallery = props =>{
    const ctx = useContext(galleryAPI)

    useEffect(()=>{
        ctx.fetchPictures("")
    },[])


    return <div id="picture-container">
    {ctx.isError && <div className="error"><img src="/error.png"/><h1>Something go wrong</h1></div>}
    {!ctx.isError && ctx.pictures.length === 0 && <div className="error"><img src="/error.png"/><h1>Not found any images</h1></div>}
    {ctx.pictures.map((picture, index)=>
        <div className={"picture-holder "+ (ctx.isPageLoading? "loading" : "")} key={picture.id}>
            <LazyLoadImage
            className="picture"
            src={picture.src.original+"?auto=compress&cs=tinysrgb&fit=crop&h=300&w=200"}//portrait
            width={200}
            height={300}
            onClick={()=>!ctx.isPageLoading? ctx.setPopupImageId(index) : ""}
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