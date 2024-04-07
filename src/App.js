import './App.css';
import Header from './components/Header/Header.js'

//import axios from 'axios'

function App() {
  async function getRecipe(options) {
    const res = await fetch("/.netlify/functions/search", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options)
    });
    const result = await res.json();
    setRecipe(result);
  }

  function setRecipe(result) {
    document.getElementsByClassName('label')[0].innerHTML = result.hits[0].recipe.label;
    document.getElementsByClassName('url')[0].innerHTML = result.hits[0].recipe.url;
  }

  return (
    <div>
      <Header />
      <h2 className='label'>LABEL</h2>
      <h2 className='url'>URL</h2>
      <button onClick={() => getRecipe({ q: 'grilled cheese', from: 0, to: 1 })}>recipe</button>
      
    </div>
  );
}

export default App;