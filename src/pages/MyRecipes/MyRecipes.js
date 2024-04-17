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
    getMyRecipes();
  }, [setUser]);

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
    console.warn(res.data);
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
      getMyRecipes();
    } else {
      setError(res.error);
    }
  };

  return (
    <div>
      <Header activeNavItem="myRecipes" headerText="My Recipes" />
      {user ? (
        <div className="d-flex align-items-center flex-column">
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
        <div className="d-flex align-items-center flex-column">
          <h2>You don't seem to be logged in!</h2>
          <button onClick={routeChange}>Login here</button>
        </div>
      )}
    </div>
  );
}

export default MyRecipes;
