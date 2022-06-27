import {useContext} from "react"
import './gallery.css'
import galleryAPI from "../store/galleryAPI"

const Gallery = props =>{
    const ctx = useContext(galleryAPI)

    return <div id="picture-container">
    {ctx.pictures.map(picture=>
        <img className="picture" key={picture.id} src={picture.src.portrait}/>
    )}
    </div>
}

export default Gallery