import {galleryAPI} from './galleryAPI'
import defData from '../defData'
import {API_KEY} from './config'

export default (query)=>{
    return async (dispatch)=>{
      dispatch(galleryAPI.onCallFetch())
      if(query === ""){
        dispatch(galleryAPI.setPicturesResponse({
          currentPageNumber: 1,
          lastPageNumber: 204, 
          pictures: defData, 
          currentQuery: "waterfall"
        }))
      }
      else{
        const fetchP = async ()=>{
          fetch("https://api.pexels.com/v1/search?"+new URLSearchParams({query, orientation: "landscape"}),
            {headers: {Authorization: API_KEY}}
          )
          .then((response)=>response.json())
          .then((response)=>{
            if(response.total_results !== 0){
              dispatch(galleryAPI.setPicturesResponse({
                currentPageNumber: 1,
                lastPageNumber: Number(((response.total_results+1)/15).toFixed(0)), 
                pictures: response.photos, 
                currentQuery: query
              }))
            }
            else{
              // setLastPageNumber(0)
              // setPictures([], setIsPageLoading(false))
              dispatch(galleryAPI.setPicturesResponse({
                currentPageNumber: 0,
                lastPageNumber: 0, 
                pictures: response.photos, 
                currentQuery: query
              }))
            }
          })
          .catch((e)=>{
            console.log(e)
            dispatch(galleryAPI.onFetchError())
          })
        }
        await fetchP()
      }
    }
  }