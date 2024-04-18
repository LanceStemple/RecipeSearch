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
      <Header headerText="My Recipes" activeNavItem="myRecipes" />
      <div className="">
        {user ? (
          <div className="myRecipesComponent">
            <h1 className="text-decoration-underline">My Recipes</h1>
            {myRecipes.length > 0 ? (
              <table className="mt-4">
                <thead>
                  <tr>
                    <th>Recipe Name</th>
                    <th>Image</th>
                    <th>Recipe URL</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {myRecipes.map((value, index) => (
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
                      <td>
                        <button onClick={() => handleDelete(value.recipe_name)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h2>You don't have any recipes yet!</h2>
            )}
            <div className="mt-auto mb-4">
              <button onClick={() => logout()} className="btn btn-danger">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column align-items-center">
            <h2>You don't seem to be logged in!</h2>
            <button onClick={routeChange} className="btn btn-primary">
              Login here
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyRecipes;
