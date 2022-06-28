import {createContext, useState, } from 'react'
import defData from '../defData'

const GalleryAPI = createContext({
    fetchPictures: () => {},
    pictures: [],
    popupImageId: -1,
    setPopupImageId: (id) => {}
})


export const GalleryConextProvider = props=>{
    const [pictures, setPictures] = useState(defData)
    const [popupImageId, setPopupImageId] = useState(-1)

    const fetchPictures = (query)=>{
      if(query != ""){
        fetch("https://api.pexels.com/v1/search?"+new URLSearchParams({query,orientation:"landscape"}),
          {headers: {Authorization: "563492ad6f917000010000018f1e5fe94faf400987592c0a0cf15f1a"}}
        )
        .then((response)=>response.json())
        .then((response)=>response.photos)
        .then((pictures)=>{
          console.log(pictures)
            setPictures(pictures)
        })
      }
      else{
        setPictures(defData)
      }
    }



    return <GalleryAPI.Provider value={{fetchPictures, pictures, popupImageId,setPopupImageId}}>{props.children}</GalleryAPI.Provider>
}


export default GalleryAPI