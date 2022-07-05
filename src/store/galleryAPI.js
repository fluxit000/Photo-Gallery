import {createContext, useEffect, useState, } from 'react'
import defData from '../defData'

const GalleryAPI = createContext({
    fetchPictures: () => {},
    pictures: [],
    popupImageId: -1,
    setPopupImageId: (id) => {},
    lastPageNumber: 0,
    currentPageNumber: 1,
    onSetCurrentPN: (page) => {},
    isPageLoading: false,
    isError: false
})


export const GalleryConextProvider = props=>{
    const [pictures, setPictures] = useState(defData)
    const [popupImageId, setPopupImageId] = useState(-1)
    const [lastPageNumber, setLastPageNumber] = useState(0)
    const [currentPageNumber, setCurrentPageNumber] = useState(1)
    const [currentQuery, setCurrentQuery] = useState("")
    const [isPageLoading, setIsPageLoading] = useState(false)
    const [isError, setIsError] = useState(false)//is request has error

    const fetchPictures = (query)=>{
      if(query != ""){
        setIsPageLoading(true)
        setCurrentQuery(query)
        fetch("https://api.pexels.com/v1/search?"+new URLSearchParams({query, orientation: "landscape"}),
          {headers: {Authorization: "563492ad6f917000010000018f1e5fe94faf400987592c0a0cf15f1a"}}
        )
        .then((response)=>response.json())
        .then((response)=>{
          setIsError(false)
          if(response.total_results !== 0){
            setCurrentPageNumber(1)
          
            setPictures(response.photos, setIsPageLoading(false))
            setLastPageNumber(Number(((response.total_results+1)/15).toFixed(0)))
          }
          else{
            setLastPageNumber(0)
            setPictures([], setIsPageLoading(false))
          }
        })
        .catch((e)=>{
          console.log(e)
          setLastPageNumber(0)
          setIsError(true)
          setPictures([], setIsPageLoading(false))
        })
      }
      else{
        setCurrentPageNumber(1)
        setLastPageNumber(204)
        setCurrentQuery("waterfall")
        setPictures(defData)
      }
    }

    const onSetCurrentPN = page=>{
      if(page <= lastPageNumber && page > 0 && !isPageLoading){
        setIsPageLoading(true)
        fetch("https://api.pexels.com/v1/search?"+new URLSearchParams(
          {query: currentQuery, orientation: "landscape", page}),
          {headers: {Authorization: "563492ad6f917000010000018f1e5fe94faf400987592c0a0cf15f1a"}}
        )
        .then((response)=>response.json())
        .then((response)=>{
          setCurrentPageNumber(page)
          setPictures(response.photos, setIsPageLoading(false))
        })
      }
    }



    return <GalleryAPI.Provider value={
      {fetchPictures, pictures, popupImageId, setPopupImageId, 
      lastPageNumber, currentPageNumber, onSetCurrentPN, isPageLoading, isError
      }}>
        {props.children}
      </GalleryAPI.Provider>
} 


export default GalleryAPI