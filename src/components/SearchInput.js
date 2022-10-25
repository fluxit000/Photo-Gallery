import { useEffect, useState,useContext } from 'react'
import './searchInput.css'
import {galleryAPI} from "../store/galleryAPI"
import fetchPictures from "../store/fetchPictures"
import { useDispatch, useSelector } from 'react-redux'

const SearchInput = props =>{
    const [searchValue, setSearchValue] = useState("")
    const isPopupShow = useSelector(s=>s.isPopupShow)

    const dispatch = useDispatch()

    useEffect(()=>{
        const timeOut = setTimeout(() => {
            dispatch(fetchPictures(searchValue))
        }, 500);

        return ()=>clearTimeout(timeOut)
    },[searchValue])

    return <div id="search-container" onChange={(input)=>setSearchValue(input.target.value)}>
        <input autoComplete="off" placeholder="Search for images" type="text" id="search-input" tabIndex={isPopupShow?-1:0}/>
    </div>
}

export default SearchInput