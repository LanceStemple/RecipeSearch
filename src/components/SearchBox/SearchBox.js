import "./SearchBox.css";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SearchBox({ headerText, left }) {
  const [name, setName] = useState("");
  const [count, setCount] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [diet, setDiet] = useState("");
  const [health, setHealth] = useState("");
  const [mealType, setMealType] = useState("");

  const navigate = useNavigate();

  const marginValue = {
    marginLeft: left ? "min(15vw,350px)" : "min(5vw,50px)",
    marginRight: left ? "min(5vw,50px)" : "min(15vw,350px)",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let countValue = parseInt(count);

    if (countValue <= 0 || isNaN(countValue)) {
      countValue = 5;
      setCount(countValue);
    }

    setTimeout(async () => {
      const options = {
        ...(name && { q: name }),
        to: countValue,
        ...(cuisineType && { cuisineType: cuisineType }),
        ...(health && { health: health }),
        ...(mealType && { mealType: mealType }),
        ...(diet && { diet: diet }),
      };

      try {
        const result = await getRecipe(options);
        navigate("/results", { state: { result } });
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    }, 100);
  };

  async function getRecipe(options) {
    const res = await fetch("/.netlify/functions/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    });
    const result = await res.json();
    return result;
  }

  return (
    <div className="outer-box d-flex flex-column" style={{ ...marginValue }}>
      <div className="headers text-white text-decoration-underline">
        {headerText}
      </div>
      <div className="inner-box">
        <form
          className="d-flex h-100 align-items-center flex-column"
          onSubmit={handleSubmit}
        >
          <label>
            <div className="d-flex flex-column mb-2">
              Food Name:
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="d-flex flex-column mb-2">
              Number of Results:
              <input
                type="text"
                name="results"
                value={count}
                onChange={(e) => setCount(e.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="d-flex flex-column mb-2">
              Cuisine Type:
              <select
                name="cuisineType"
                value={cuisineType}
                onChange={(e) => setCuisineType(e.target.value)}
              >
                <option value="">Select Cuisine Type</option>
                <option value="American">American</option>
                <option value="Asian">Asian</option>
                <option value="British">British</option>
                <option value="Caribbean">Caribbean</option>
                <option value="Central Europe">Central Europe</option>
                <option value="Chinese">Chinese</option>
                <option value="Eastern Europe">Eastern Europe</option>
                <option value="French">French</option>
                <option value="Indian">Indian</option>
                <option value="Italian">Italian</option>
                <option value="Japanese">Japanese</option>
                <option value="Kosher">Kosher</option>
                <option value="Mediterranean">Mediterranean</option>
                <option value="Mexican">Mexican</option>
                <option value="Middle Eastern">Middle Eastern</option>
                <option value="Nordic">Nordic</option>
                <option value="South American">South American</option>
                <option value="South East Asian">South East Asian</option>
              </select>
            </div>
          </label>
          <label>
            <div className="d-flex flex-column mb-2">
              Diet:
              <select
                name="diet"
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
              >
                <option value="">Select Diet</option>
                <option value="balanced">Balanced</option>
                <option value="high-fiber">High Fiber</option>
                <option value="high-protein">High Protein</option>
                <option value="low-carb">Low Carb</option>
                <option value="low-fat">Low Fat</option>
                <option value="low-sodium">Low Sodium</option>
              </select>
            </div>
          </label>
          <label></label>
          <label>
            <div className="d-flex flex-column mb-2">
              Meal Type:
              <select
                name="mealType"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
              >
                <option value="">Select Meal Type</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Dinner">Dinner</option>
                <option value="Lunch">Lunch</option>
                <option value="Snack">Snack</option>
                <option value="Teatime">Teatime</option>
              </select>
            </div>
          </label>
          <label>
            <div className="d-flex flex-column mb-2">
              Health Options:
              <select
                name="health"
                value={health}
                onChange={(e) => setHealth(e.target.value)}
              >
                <option value="">Select Health Option</option>
                <option value="alcohol-cocktail">Alcohol-Cocktail</option>
                <option value="alcohol-free">Alcohol-Free</option>
                <option value="celery-free">Celery-Free</option>
                <option value="crustacean-free">Crustacean-Free</option>
                <option value="dairy-free">Dairy-Free</option>
                <option value="DASH">DASH</option>
                <option value="egg-free">Egg-Free</option>
                <option value="fish-free">Fish-Free</option>
                <option value="fodmap-free">Fodmap-Free</option>
                <option value="gluten-free">Gluten-Free</option>
                <option value="immuno-supportive">Immuno-Supportive</option>
                <option value="keto-friendly">Keto-Friendly</option>
                <option value="kidney-friendly">Kidney-Friendly</option>
                <option value="kosher">Kosher</option>
                <option value="low-fat-abs">Low-Fat-Abs</option>
                <option value="low-potassium">Low-Potassium</option>
                <option value="low-sugar">Low-Sugar</option>
                <option value="lupine-free">Lupine-Free</option>
                <option value="Mediterranean">Mediterranean</option>
                <option value="mollusk-free">Mollusk-Free</option>
                <option value="no-oil-added">No-Oil-Added</option>
                <option value="paleo">Paleo</option>
                <option value="peanut-free">Peanut-Free</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="pork-free">Pork-Free</option>
                <option value="red-meat-free">Red-Meat-Free</option>
                <option value="sesame-free">Sesame-Free</option>
                <option value="shellfish-free">Shellfish-Free</option>
                <option value="soy-free">Soy-Free</option>
                <option value="sugar-conscious">Sugar-Conscious</option>
                <option value="sulfite-free">Sulfite-Free</option>
                <option value="tree-nut-free">Tree-Nut-Free</option>
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="wheat-free">Wheat-Free</option>
              </select>
            </div>
          </label>
          <div className="d-flex mt-auto justify-content-end">
            <button className="search-button text-white" type="submit">
              Search For Recipes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchBox;
