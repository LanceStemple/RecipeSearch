import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./MyRecipes.css";

import Header from "../../components/Header/Header.js";
import { supabase } from "../../helper/supabaseClient.js";
import { useUser } from "../../contexts/UserContext";

function MyRecipes() {
  // eslint-disable-next-line
  const { user, setUser } = useUser();
  const [myRecipes, setMyRecipes] = useState([]);

  // eslint-disable-next-line
  const [error, setError] = useState(null);

  useEffect(() => {
    getMyRecipes();
  }, []);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/login`;
    navigate(path);
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const getMyRecipes = async () => {
    const res = await supabase.from("myRecipes").select("*");

    setMyRecipes(res.data);
    setError(res.error);
  };

  const handleDelete = async (recipe_name) => {
    const res = await supabase
      .from("myRecipes")
      .delete()
      .eq("recipe_name", recipe_name)
      .single();
    if (!res.error) {
      setMyRecipes((currentRecipe) =>
        currentRecipe.filter((recipe) => recipe.recipe_name === recipe_name)
      );
    } else {
      setError(res.error);
    }
  };

  return (
    <div>
      <Header activeNavItem="myRecipes" headerText="My Recipes" />
      {user ? (
        <div>
          <h1>Authenticated</h1>
          {myRecipes.map((value, index) => {
            return (
              <div key={index}>
                <h2>{value.recipe_name}</h2>
                <a href={value.recipe_url}>{value.recipe_url}</a>
                <button onClick={() => handleDelete(value.recipe_name)}>
                  Delete
                </button>
              </div>
            );
          })}
          <button onClick={() => logout()}>Logout</button>
        </div>
      ) : (
        <button onClick={routeChange}>Login here</button>
      )}
    </div>
  );
}

export default MyRecipes;
