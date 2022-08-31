import { useEffect, useState,useContext } from 'react'
import './searchInput.css'
import {galleryAPI, fetchPictures} from "../store/galleryAPI"
import { useDispatch } from 'react-redux'

const SearchInput = props =>{
    const [searchValue, setSearchValue] = useState("")

    const dispatch = useDispatch()

    useEffect(()=>{
        const timeOut = setTimeout(() => {
            dispatch(fetchPictures(searchValue))
        }, 500);

        return ()=>clearTimeout(timeOut)
    },[searchValue])

    return <div id="search-container" onChange={(input)=>setSearchValue(input.target.value)}>
        <input autoComplete="off" placeholder="Search for images" type="text" id="search-input"/>
    </div>
}

export default SearchInput