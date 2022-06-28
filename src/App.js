import './App.css';
import Gallery from './components/Gallery';
import SearchInput from './components/SearchInput'
import Popup from './components/Popup';

function App() {


  return (<main>
    <Popup />
    <section>
      <SearchInput/>
    </section>
    <article>
      <Gallery/>
    </article>
  </main>);
}

export default App;
