import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../../components/Header/Header.js'

function ResultsPage() {
  const location = useLocation();
  const [recipes, setRecipes] = useState([]);

  const result = location.state ? location.state.result : null;

  useEffect(() => {
    if (location.state && location.state.result) {
      setRecipes(location.state.result.hits.map(hit => hit.recipe));
    }
  }, [location.state]);

  function setRecipe(result) {
    let labels = []
    result.hits.forEach((hit) =>{
      labels.push(hit.recipe.label);
    });

    let urls = []
    result.hits.forEach((hit) =>{
      urls += hit.recipe.url;
    });
  }

  return (
    <div>
        <Header activeNavItem="search"/>
        <div>
            <table className='w-100'>
              <thead>
                <tr>
                  <th>Label</th>
                  <th>URL</th>
                </tr>
              </thead>
              <tbody>
                {recipes.map((recipe, index) => (
                <tr key={index}>
                  <td>{recipe.label}</td>
                  <td><a href={recipe.url} target="_blank" rel="noopener noreferrer">{recipe.url}</a></td>
                </tr>
              ))}
              </tbody>
            </table>
        </div>
    </div>
  );
}

export default ResultsPage;