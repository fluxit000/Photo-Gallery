import './App.css';
import { useContext } from 'react';

import { Transition } from 'react-transition-group';

import Gallery from './components/Gallery';
import SearchInput from './components/SearchInput'
import Popup from './components/Popup';
import {galleryAPI} from './store/galleryAPI';
import Pages from "./components/pages"
import { useDispatch, useSelector } from 'react-redux';

function App() {

  const dispatch = useDispatch()
  const render = useSelector(s=>s.isPopupShow)
  

  return (<div id='contner'>
      <main>
        <Transition in={render} onExited={()=>dispatch(galleryAPI.setPopupImageId(-1))} timeout={500}>
          {state => (
            state !== "exited" && <Popup state={state}/>
          )}
        </Transition>
        <section>
          <SearchInput/>
        </section>
        <article id='picture-border'>
          <Gallery/>
          <Pages/>
        </article>
      </main>
      <footer>Photos provided by Pexels</footer>
  </div>);
}

export default App;
