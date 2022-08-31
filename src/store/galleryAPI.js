import { configureStore, createSlice } from '@reduxjs/toolkit';
import defData from '../defData'

const gallery = createSlice({
  name: "gallery",
  initialState: {
    pictures: [],
    popupImageId: -1,
    lastPageNumber: 0,
    currentPageNumber: 1,
    isPageLoading: false,
    isError: false,
    isPopupShow: false, 
    currentQuery: ""
  },
  reducers:{
    setPicturesResponse(state, action){
      state.currentPageNumber = action.payload.currentPageNumber
      state.lastPageNumber = action.payload.lastPageNumber
      state.pictures = action.payload.pictures
      state.currentQuery = action.payload.currentQuery
      state.isPageLoading = false
    },
    onCallFetch(state, action){//on start Fetching request
      state.isPageLoading = true
      state.isError = false
    },
    onFetchError(state, action){
      state.pictures = []
      state.isPageLoading = false
      state.isError = true
      state.lastPageNumber = 0
    },
    setPopupImageId(state, action){
      state.isPopupShow = true
      state.currentPageNumber = action.payload
    },
    onSetCurrentPN(state, action){
      
    },
    setIsPopupShow(state, action){

    }
  }
})

export const galleryAPI = gallery.actions;


export const fetchPictures = (query)=>{
  return async (dispatch)=>{
    if(query === ""){
      dispatch(galleryAPI.setPicturesResponse({
        currentPageNumber: 1,
        lastPageNumber: 204, 
        pictures: defData, 
        currentQuery: "waterfall"
      }))
    }
    else{
      dispatch(galleryAPI.onCallFetch())

      const fetchP = async ()=>{
        fetch("https://api.pexels1.com/v1/search?"+new URLSearchParams({query, orientation: "landscape"}),
          {headers: {Authorization: "563492ad6f917000010000018f1e5fe94faf400987592c0a0cf15f1a"}}
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


const store = configureStore({
  reducer: gallery.reducer
});

export default store;


// import {createContext, useEffect, useState, } from 'react'
// import defData from '../defData'

// const GalleryAPI = createContext({
//     fetchPictures: query => {},
//     pictures: [],
//     popupImageId: -1,
//     setPopupImageId: id => {},
//     lastPageNumber: 0,
//     currentPageNumber: 1,
//     onSetCurrentPN: page => {},
//     isPageLoading: false,
//     isError: false,
//     isPopupShow: false, 
//     setIsPopupShow: state => {}
// })


// export const GalleryConextProvider = props=>{
//     const [pictures, setPictures] = useState([])
//     const [isPageLoading, setIsPageLoading] = useState(false)
//     const [isError, setIsError] = useState(false)//is request has error
//     const [currentQuery, setCurrentQuery] = useState("")

//     const [popupImageId, setPopupImageId] = useState(-1)
//     const [isPopupShow, setIsPopupShow] = useState(false)

//     const [lastPageNumber, setLastPageNumber] = useState(0)
//     const [currentPageNumber, setCurrentPageNumber] = useState(1)



//     const fetchPictures = (query)=>{
//       if(query != ""){
//         setIsPageLoading(true)
//         setIsError(false)
//         setCurrentQuery(query)
//         fetch("https://api.pexels.com/v1/search?"+new URLSearchParams({query, orientation: "landscape"}),
//           {headers: {Authorization: "563492ad6f917000010000018f1e5fe94faf400987592c0a0cf15f1a"}}
//         )
//         .then((response)=>response.json())
//         .then((response)=>{
//           if(response.total_results !== 0){
//             setCurrentPageNumber(1)
//             setLastPageNumber(Number(((response.total_results+1)/15).toFixed(0)), setPictures(response.photos))
//             setIsPageLoading(false)
            
            
//           }
//           else{
//             setLastPageNumber(0)
//             setPictures([], setIsPageLoading(false))
//           }
//         })
//         .catch((e)=>{
//           console.log(e)
//           setLastPageNumber(0)
//           setIsError(true)
//           setPictures([], setIsPageLoading(false))
//         })
//       }
//       else{
//         setCurrentPageNumber(1)
//         setLastPageNumber(204, setPictures(defData))
//         setCurrentQuery("waterfall")
//       }
//     }

//     const onSetCurrentPN = page=>{
//       if(page <= lastPageNumber && page > 0 && !isPageLoading){
//         setIsPageLoading(true)
//         fetch("https://api.pexels.com/v1/search?"+new URLSearchParams(
//           {query: currentQuery, orientation: "landscape", page}),
//           {headers: {Authorization: "563492ad6f917000010000018f1e5fe94faf400987592c0a0cf15f1a"}}
//         )
//         .then((response)=>response.json())
//         .then((response)=>{
//           setCurrentPageNumber(page)
//           setPictures(response.photos, setIsPageLoading(false))
//         })
//       }
//     }

//     return <GalleryAPI.Provider value={
//       {fetchPictures, pictures, popupImageId, setPopupImageId, 
//       lastPageNumber, currentPageNumber, onSetCurrentPN, isPageLoading, isError,
//       isPopupShow, setIsPopupShow
//       }}>
//         {props.children}
//       </GalleryAPI.Provider>
// } 


// export default GalleryAPI