import { useEffect, useState,useContext } from 'react'
import './searchInput.css'
import galleryAPI from "../store/galleryAPI"

const SearchInput = props =>{
    const [searchValue, setSearchValue] = useState("")

    const ctx = useContext(galleryAPI)

    useEffect(()=>{
        const timeOut = setTimeout(() => {
            ctx.fetchPictures(searchValue)
        }, 500);

        return ()=>clearTimeout(timeOut)
    },[searchValue])

    return <div id="search-container" onChange={(input)=>setSearchValue(input.target.value)}>
        <input type="text" id="search-input"/>
    </div>
}

export default SearchInput