import { useEffect, useState } from 'react'
import './searchInput.css'

const SearchInput = props =>{
    const [searchValue, setSearchValue] = useState("")

    useEffect(()=>{
        const timeOut = setTimeout(() => {
            props.fetchPictures(searchValue)
        }, 500);

        return ()=>clearTimeout(timeOut)
    },[searchValue])

    return <div id="search-container" onChange={(input)=>setSearchValue(input.target.value)}>
        <input type="text" id="search-input"/>
    </div>
}

export default SearchInput