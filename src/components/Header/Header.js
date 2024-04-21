import { Link, useNavigate } from "react-router-dom";

import "./Header.css";

import logo from "../../assets/Ellipse 1.png";

function Header({ activeNavItem, headerText }) {
  let navigate = useNavigate();

  return (
    <div className="header w-100 d-flex align-items-center">
      <img src={logo} alt="Logo" onClick={() => navigate("/")} />
      <h2 className="text-white justify-content-start">{headerText}</h2>
      <nav className="d-flex w-100 justify-content-end text-white gap-4">
        <Link
          className={`text-white ${
            activeNavItem === "search" ? "active" : "inactive"
          }`}
          to="/"
        >
          Search
        </Link>
        <Link
          className={`text-white ${
            activeNavItem === "myRecipes" ? "active" : "inactive"
          }`}
          to="/myRecipes"
        >
          My Recipes
        </Link>
        <Link
          className={`text-white ${
            activeNavItem === "popular" ? "active" : "inactive"
          }`}
          to="/popular"
        >
          Popular
        </Link>
      </nav>
    </div>
  );
}

export default Header;
