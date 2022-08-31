import { configureStore, createSlice } from '@reduxjs/toolkit';


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
    onCallFetch(state, action){//on start fetching request
      state.isPageLoading = true
      state.isError = false
    },
    onFetchError(state, action){
      state.pictures = []
      state.isPageLoading = false
      state.isError = true
      state.lastPageNumber = 0
    },
    onPageChange(state, action){
      state.pictures = action.payload.pictures
      state.currentPageNumber = action.payload.currentPageNumber
      state.isPageLoading = false
    },
    setPopupImageId(state, action){
      state.popupImageId = action.payload
    },
    setIsPopupShow(state, action){
      state.isPopupShow = action.payload
    }
  }
})

export const galleryAPI = gallery.actions;

export const setPage = page=>{
  return async (dispatch, getState)=>{
    dispatch(galleryAPI.onCallFetch())
    const fetchP = async ()=>{
      fetch("https://api.pexels.com/v1/search?"+new URLSearchParams(
        {query: getState().currentQuery, orientation: "landscape", page}),
        {headers: {Authorization: "563492ad6f917000010000018f1e5fe94faf400987592c0a0cf15f1a"}}
      )
      .then((response)=>response.json())
      .then((response)=>{
          dispatch(galleryAPI.onPageChange({pictures: response.photos, currentPageNumber: page}))
      })
      .catch((e)=>{
        console.log(e)
        dispatch(galleryAPI.onFetchError())
      })
    }
    await fetchP()
  }
}


const store = configureStore({
  reducer: gallery.reducer
});

export default store;