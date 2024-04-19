import { useEffect, useState } from "react";

import "./Popular.css";

import Header from "../../components/Header/Header.js";
import { supabase } from "../../helper/supabaseClient.js";

function Popular() {
  const [popularRecipes, setPopularRecipes] = useState([]);

  // eslint-disable-next-line
  const [error, setError] = useState(null);

  useEffect(() => {
    getPopularRecipes();
  }, []);

  const getPopularRecipes = async () => {
    const res = await supabase.from("myRecipes").select("*");
    const recipeMap = new Map();

    res.data.forEach((recipe) => {
      const recipeName = recipe.recipe_name;
      recipeMap.set(recipeName, (recipeMap.get(recipeName) || 0) + 1);
    });

    function removeDuplicates(recipes) {
      const uniqueRecipes = {};
      recipes.forEach((recipe) => {
        if (!uniqueRecipes[recipe.recipe_name]) {
          uniqueRecipes[recipe.recipe_name] = recipe;
          recipe.count = recipeMap.get(recipe.recipe_name);
        }
      });
      return Object.values(uniqueRecipes);
    }

    res.data = removeDuplicates(res.data);

    res.data.sort((a, b) => b.count - a.count);

    res.data = res.data.slice(0, 20);

    setPopularRecipes(res.data);
    setError(res.error);
  };

  return (
    <div>
      <Header headerText="Popular Recipes" activeNavItem="popular" />
      <div>
        <div className="popular-recipes-component">
          <h1 className="text-decoration-underline mt-4">Popular Recipes</h1>
          {popularRecipes.length > 0 ? (
            <table className="mt-4">
              <thead>
                <tr>
                  <th>Recipe Name</th>
                  <th>Preview</th>
                  <th>Recipe URL</th>
                  <th>Number of Saves</th>
                </tr>
              </thead>
              <tbody>
                {popularRecipes.map((value, index) => (
                  <tr key={index}>
                    <td>{value.recipe_name}</td>
                    <td>
                      <img alt="recipe" src={value.recipe_img}></img>
                    </td>
                    <td>
                      <a
                        href={value.recipe_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {value.recipe_url}
                      </a>
                    </td>
                    <td>{value.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h2>Nothing seems to be popular!</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default Popular;
