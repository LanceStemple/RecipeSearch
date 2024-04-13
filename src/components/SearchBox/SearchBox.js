import "./SearchBox.css"

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SearchBox({headerText, left}) {
    const [name, setName] = useState("");
    const [count, setCount] = useState("");
  
    const navigate = useNavigate();
  
    const marginValue = {
      marginLeft: left ? '350px' : '50px',
      marginRight: left ? '50px' : '350px',
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const options = {
        q: name,
        to: count,
      };
  
      try {
        const result = await getRecipe(options);
        navigate('/results', { state: { result } });
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
  
    async function getRecipe(options) {
      const res = await fetch("/.netlify/functions/search", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(options)
      });
      const result = await res.json();
      return result;
    }
  
    return (
        <div className="outer-box d-flex flex-column" style={{ ...marginValue }}>
          <div className="headers text-white text-decoration-underline">{headerText}</div>
          <div className="inner-box">
          <form className='d-flex h-100 align-items-center flex-column' onSubmit={handleSubmit}>
            <label>
              <div className='d-flex flex-column mb-2'>
                Recipe Name:
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
              </div>
            </label>
            <label>
              <div className='d-flex flex-column mb-2'>
                Number of Results:
                <input type="text" name="results" value={count} onChange={(e) => setCount(e.target.value)}/>
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

export default SearchBox;