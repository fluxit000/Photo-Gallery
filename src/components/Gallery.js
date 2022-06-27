import { useEffect, useState } from "react"
import './gallery.css'

const Gallery = props =>{
    // const [picturesRes, setPicturesRes] = useState([])

    useEffect(() => {
        // fetch("https://api.pexels.com/v1/search?"+new URLSearchParams({query: "waterfall",orientation:"portrait"}),
        //     {headers: {Authorization: "563492ad6f917000010000018f1e5fe94faf400987592c0a0cf15f1a"}}
        // )
        // .then((response)=>response.json())
        // .then((response)=>response.photos)
        // .then((pictures)=>{
        //     setPicturesRes(pictures)
        // })

        console.log(props)

    },[]);

    return <div id="picture-container">
    {props.pictures.map(picture=>
        <img className="picture" key={picture.id} src={picture.src.portrait}/>
    )}
    </div>
}

export default Gallery