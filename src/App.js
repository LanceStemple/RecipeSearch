import './App.css';
import Header from './components/Header/Header.js'

import axios from 'axios'

function App() {
  const recipe = () => {
    const options = {
      method: 'GET',
      url: 'http://localhost:8000/search',
      params: {
        q: "grilled cheese",
        from: 0,
        to: 5,
      }
    }
  
    axios.request(options).then((response) => {
        console.log(response.data);
    }).catch((error) => {
        console.error(error)
    })
  }

  return (
    <div>
      <Header></Header>
      <button onClick={recipe}>recipe</button>
    </div>
    
  );
}

export default App;
