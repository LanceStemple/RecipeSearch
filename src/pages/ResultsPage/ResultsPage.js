import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header.js'

function ResultsPage() {
  const location = useLocation();
  const result = location.state ? location.state.result : null;

  useEffect(() => {
    if (result) {
      setRecipe(result);
    }
  }, [result]); // Only re-run the effect if result changes

  function setRecipe(result) {
    document.getElementsByClassName('label')[0].innerHTML = result.hits[0].recipe.label;
    document.getElementsByClassName('url')[0].innerHTML = result.hits[0].recipe.url;
  }

  return (
    <div>
        <Header activeNavItem="search"/>
        <div>
            <h2 className='label'>LABEL</h2>
            <h2 className='url'>URL</h2>
        </div>
    </div>
  );
}

export default ResultsPage;