import './App.css';
import Header from './components/Header/Header.js'

function Instructions({headerText, left}) {
  const marginValue = {
    marginLeft: left ? '350px' : '50px',
    marginRight: left ? '50px' : '350px',
  };

  return (
    <div className="outer-box d-flex flex-column" style={{ ...marginValue }}>
      <div className="headers text-white text-decoration-underline">{headerText}</div>
      <div className="inner-box">
        <p>Use the specifications box to the right to enter the recipe you want.</p>
        <p>Don’t know yet? No worries! Instead specify what you want your meal to consist of and we can recommend recipes you’re sure to love!</p>
        <p>Once ready, click the search for recipe button to get recipes.</p>
      </div>
    </div>
  );
}

function Search({headerText, left}) {
  const marginValue = {
    marginLeft: left ? '350px' : '50px',
    marginRight: left ? '50px' : '350px',
  };

  return (
    <div className="outer-box d-flex flex-column" style={{ ...marginValue }}>
      <div className="headers text-white text-decoration-underline">{headerText}</div>
      <div className="inner-box">
      <form className='d-flex h-100 align-items-center flex-column'>
        <label>
          <div className='d-flex flex-column mb-2'>
            Recipe Name:
            <input type="text" name="name" />
          </div>
        </label>
        <label>
          <div className='d-flex flex-column mb-2'>
            Number of Results:
            <input type="email" name="email" />
          </div>
        </label>
        <div className='d-flex mt-auto justify-content-end'>
          <button className="search-button text-white" type="submit">Search For Recipes</button>
        </div>
      </form>
      </div>
    </div>
  );
}

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
      <Header activeNavItem="search"/>
      <div className='d-flex justify-content-between mt-5'>
        <Instructions headerText="Search For Your Perfect Recipe!" left></Instructions>
        <Search headerText="Specify Your Recipe"></Search>
      </div>
      <h2 className='label'>LABEL</h2>
      <h2 className='url'>URL</h2>
      <button onClick={() => getRecipe({ q: 'grilled cheese', to: 1 })}>recipe</button> 
    </div>
  );
}

export default App;