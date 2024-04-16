import { supabase } from "../../helper/supabaseClient.js";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useUser } from "../../contexts/UserContext";
import Header from "../../components/Header/Header.js";

function LoginPage() {
  const { user, setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [signUpEmail, setSignUpEmail] = useState(false);

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
  }, [setUser]);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/myRecipes`;
    navigate(path);
  };

  const login = async (email, password) => {
    await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    routeChange();
  };

  const signup = async (email, password) => {
    await supabase.auth.signUp({ email, password });
    setSignUpEmail(true);
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLogin) {
      try {
        await login(email, password);
      } catch (error) {
        console.error("Error logging in:", error.message);
      }
    } else {
      try {
        await signup(email, password);
      } catch (error) {
        console.error("Error signing up:", error.message);
      }
    }
  };

  return (
    <div className="d-flex h-100 align-items-center flex-column">
      <Header headerText={isLogin ? "Login" : "Sign Up"} />
      {user ? (
        <div>
          <h1>Authenticated</h1>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <form
          className="d-flex align-items-center flex-column"
          onSubmit={handleSubmit}
        >
          <label>
            <div className="d-flex flex-column mb-2">
              Email:
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="d-flex flex-column mb-2">
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </label>
          <div className="d-flex mt-auto justify-content-end">
            <button className="search-button text-white" type="submit">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
        </form>
      )}
      <p className="text-danger">
        {signUpEmail
          ? "A verification email has been sent. Please confirm and log in."
          : ""}
      </p>
      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin
          ? "Don't have an account? Sign up"
          : "Already have an account? Log in"}
      </p>
    </div>
  );
}

export default LoginPage;
