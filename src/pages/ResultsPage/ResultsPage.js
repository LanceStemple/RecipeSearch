import './ResultsPage.css';

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../../components/Header/Header.js'

function ResultsPage() {
  const location = useLocation();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (location.state && location.state.result) {
      setRecipes(location.state.result.hits.map(hit => hit.recipe));
    }
  }, [location.state]);

  return (
    <div>
        <Header activeNavItem="search" headerText="Results"/>
        <div className='results-component'>
            <table className='w-100 mt-4 ms-4'>
              <thead>
                <tr>
                  <th>Label</th>
                  <th>Image</th>
                  <th>URL</th>
                </tr>
              </thead>
              <tbody>
                {recipes.map((recipe, index) => (
                <tr key={index}>
                  <td>{recipe.label}</td>
                  <td><img src={recipe.image}></img></td>
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