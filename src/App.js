import './App.css';
import { useContext } from 'react';

import Gallery from './components/Gallery';
import SearchInput from './components/SearchInput'
import Popup from './components/Popup';
import galleryAPI from './store/galleryAPI';
import Pages from "./components/pages"

function App() {


  const ctx = useContext(galleryAPI)
  const render = ctx.popupImageId != -1

  return (<><main>
    {render && <Popup />}
    <section>
      <SearchInput/>
    </section>
    <article id='picture-border'>
      <Gallery/>
      <Pages/>
    </article>
  </main>
  <footer>Photos provided by Pexels</footer>
  </>
  );
}

export default App;
