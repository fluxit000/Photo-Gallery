import {useContext} from "react"
import './gallery.css'
import galleryAPI from "../store/galleryAPI"
import { LazyLoadImage } from "react-lazy-load-image-component"

const Gallery = props =>{
    const ctx = useContext(galleryAPI)

    return <div id="picture-container">
    {ctx.pictures.map((picture, index)=>
        <div className="picture-holder" key={picture.id}>
            <LazyLoadImage
            className="picture"
            src={picture.src.original+"?auto=compress&cs=tinysrgb&fit=crop&h=300&w=200"}//portrait
            width={200}
            height={300}
            onClick={()=>ctx.setPopupImageId(index)}
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