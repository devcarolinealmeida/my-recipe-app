// backend/server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Key stored securely on server
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes';

// Proxy endpoints
app.get('/api/recipes/random', async (req, res) => {
  try {
    const { number = 10 } = req.query;
    const response = await axios.get(`${SPOONACULAR_BASE_URL}/random`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        number
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch random recipes' });
  }
});

app.get('/api/recipes/search', async (req, res) => {
  try {
    const { query, number = 10 } = req.query;
    const response = await axios.get(`${SPOONACULAR_BASE_URL}/complexSearch`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        query,
        number,
        addRecipeInformation: true
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search recipes' });
  }
});

app.get('/api/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${SPOONACULAR_BASE_URL}/${id}/information`, {
      params: {
        apiKey: SPOONACULAR_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipe details' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
