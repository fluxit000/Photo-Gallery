import './App.css';
import Gallery from './components/Gallery';
import SearchInput from './components/SearchInput'
import { useEffect, useState } from "react"
import defData from './defData'

function App() {
  const [pictures, setPictures] = useState(defData)

  const fetchPictures = (query)=>{
    if(query != ""){
      fetch("https://api.pexels.com/v1/search?"+new URLSearchParams({query,orientation:"portrait"}),
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


  return (<main>
    <section>
      <SearchInput fetchPictures={fetchPictures}/>
    </section>
    <article>
      <Gallery pictures={pictures} fetchPictures={fetchPictures}/>
    </article>
  </main>);
}

export default App;
