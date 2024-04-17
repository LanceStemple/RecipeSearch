import "./ResultsPage.css";

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Header from "../../components/Header/Header.js";
import { supabase } from "../../helper/supabaseClient.js";
import { useUser } from "../../contexts/UserContext";

function ResultsPage() {
  const location = useLocation();
  const [recipes, setRecipes] = useState([]);
  const { user, setUser } = useUser();

  useEffect(() => {
    if (location.state && location.state.result) {
      setRecipes(location.state.result.hits.map((hit) => hit.recipe));
    }

    const fetchData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user);

      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          switch (event) {
            case "SIGNED_IN":
              setUser(session?.user);
              break;
            case "SIGNED_OUT":
              setUser(null);
              break;
            default:
              break;
          }
        }
      );

      return () => {
        authListener.unsubscribe();
      };
    };
    fetchData();
  }, [location.state, setUser]);

  const saveRecipe = async (recipe_name, recipe_url, recipe_img) => {
    if (user) {
      // Check if the recipe already exists for the user
      const { data: existingRecipes, error } = await supabase
        .from("myRecipes")
        .select("*")
        .eq("recipe_name", recipe_name)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error checking existing recipes:", error.message);
        // Handle error appropriately
        return;
      }

      // If there are existing recipes for the user with the same name, don't insert
      if (existingRecipes && existingRecipes.length > 0) {
        console.log("Recipe already exists for this user.");
        // Handle this case if needed
        return;
      }

      // Insert the recipe if it doesn't exist for the user
      await supabase.from("myRecipes").insert({
        recipe_name: recipe_name,
        recipe_url: recipe_url,
        recipe_img: recipe_img,
        user_id: user.id,
      });
    } else {
      // Handle case when user is not signed in
      // stuff about not being signed in here
    }
  };

  return (
    <div>
      <Header headerText="Results" />
      <div className="results-component">
        <table className="w-100 mt-4 ms-4">
          <thead>
            <tr>
              <th>Label</th>
              <th>Image</th>
              <th>URL</th>
              <th>My Recipes</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe, index) => (
              <tr key={index}>
                <td>{recipe.label}</td>
                <td>
                  <img src={recipe.image} alt="recipe"></img>
                </td>
                <td>
                  <a
                    href={recipe.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {recipe.url}
                  </a>
                </td>
                <td>
                  <button
                    onClick={() =>
                      saveRecipe(recipe.label, recipe.url, recipe.image)
                    }
                  >
                    Save To My Recipes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultsPage;
