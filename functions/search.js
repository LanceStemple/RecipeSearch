const axios = require("axios");

exports.handler = async (event) => {
  const { q, to, cuisineType, health, mealType, diet } = JSON.parse(event.body);

  const options = {
    method: "GET",
    url: "https://api.edamam.com/search",
    headers: {
      app_id: process.env.RECIPE_API_ID,
      app_key: process.env.RECIPE_API_KEY,
    },
    params: {
      from: 0,
      to: to,
      app_id: process.env.RECIPE_API_ID,
      app_key: process.env.RECIPE_API_KEY,
    },
  };

  if (q) {
    options.params.q = q;
  } else {
    options.params.q = "";
  }
  if (cuisineType) {
    options.params.cuisineType = cuisineType;
  }
  if (health) {
    options.params.health = health;
  }
  if (mealType) {
    options.params.mealType = mealType;
  }
  if (diet) {
    options.params.diet = diet;
  }

  const response = await axios.request(options);
  return {
    statusCode: 200,
    body: JSON.stringify(response.data),
  };
};
