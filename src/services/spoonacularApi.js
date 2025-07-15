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

export const searchRecipes = async (query, filters = {}) => {
  try {
    const params = {
      number: 12,
      addRecipeInformation: true,
      fillIngredients: true
    };

    if (query) {
      params.query = query;
    }

    if (filters.diet) {
      params.diet = filters.diet;
    }

    if (filters.cuisine) {
      params.cuisine = filters.cuisine;
    }

    if (filters.type) {
      params.type = filters.type;
    }

    if (filters.maxReadyTime) {
      params.maxReadyTime = filters.maxReadyTime;
    }

    if (filters.intolerances && filters.intolerances.length > 0) {
      params.intolerances = filters.intolerances.join(',');
    }

    const response = await api.get('/complexSearch', { params });
    
    return response.data.results || [];
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
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
