import axios from "axios";

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
  }
}); 

export const getRandomRecipes = async (number = 10) => {
  try {
    const response = await api.get('/random', {
      params: {
        number,
      }
    });
    return response.data.recipes; // Return the list of random recipes
  } catch (error) {
    console.error("Error fetching random recipes:", error);
    throw error; // Rethrow the error for further handling
  }
}

export const searchRecipes = async (query) => {
  try {
    const response = await api.get('/complexSearch', {
      params: {
        query,
        number: 10, // Number of recipes to fetch
        addRecipeInformation: true, // Importante per avere summary, readyInMinutes, ecc.
      }
    });
    return response.data.results; // Return the list of recipes
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error; // Rethrow the error for further handling
  }
}

export const getRecipeDetails = async (id) => {
  try {
    const response = await api.get(`/${id}/information`);
    return response.data; // Return the recipe details
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    throw error; // Rethrow the error for further handling
  }
}
