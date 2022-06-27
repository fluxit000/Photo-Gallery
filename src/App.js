import './App.css';
import Gallery from './components/Gallery';
import SearchInput from './components/SearchInput'

function App() {


  return (<main>
    <section>
      <SearchInput/>
    </section>
    <article>
      <Gallery/>
    </article>
  </main>);
}

export default App;
