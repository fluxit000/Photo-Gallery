import './App.css';
import Gallery from './components/Gallery';
import SearchInput from './components/SearchInput'
import Popup from './components/Popup';
import galleryAPI from './store/galleryAPI';
import { useContext } from 'react';

function App() {


  const ctx = useContext(galleryAPI)
  const render = ctx.popupImageId != -1

  return (<><main>
    {render && <Popup />}
    <section>
      <SearchInput/>
    </section>
    <article>
      <Gallery/>
    </article>
  </main>
  <footer><span id='pexels'>Photos provided by Pexels</span></footer>
  </>
  );
}

export default App;
