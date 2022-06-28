import {useContext} from "react"
import './gallery.css'
import galleryAPI from "../store/galleryAPI"
import { LazyLoadImage } from "react-lazy-load-image-component"

const Gallery = props =>{
    const ctx = useContext(galleryAPI)

    return <div id="picture-container">
    {ctx.pictures.map((picture, index)=>
        <LazyLoadImage
        className="picture" 
        key={picture.id}
        src={picture.src.portrait}
        width={200}
        height={300}
        onClick={()=>ctx.setPopupImageId(index)}
        // placeholderSrc="loading.gif"
        />
    )}
    </div>
}

export default Gallery