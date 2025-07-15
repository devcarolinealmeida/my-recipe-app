import React, { useState, useEffect, useCallback } from 'react';
import { searchRecipes, getRandomRecipes } from '../../services/spoonacularApi';
import CardRecipe from '../../components/CardRecipe';

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    diet: '',
    cuisine: '',
    type: '',
    maxReadyTime: '',
    intolerances: []
  });

  const dietOptions = [
    { value: '', label: 'Any diet' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'gluten free', label: 'Gluten Free' },
    { value: 'ketogenic', label: 'Ketogenic' },
    { value: 'paleo', label: 'Paleo' }
  ];

  const cuisineOptions = [
    { value: '', label: 'Any cuisine' },
    { value: 'italian', label: 'Italian' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'indian', label: 'Indian' },
    { value: 'french', label: 'French' },
    { value: 'american', label: 'American' },
    { value: 'mediterranean', label: 'Mediterranean' }
  ];

  const typeOptions = [
    { value: '', label: 'Any type' },
    { value: 'main course', label: 'Main Course' },
    { value: 'appetizer', label: 'Appetizer' },
    { value: 'dessert', label: 'Dessert' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'salad', label: 'Salad' },
    { value: 'soup', label: 'Soup' }
  ];

  const intoleranceOptions = [
    { value: 'dairy', label: 'Dairy' },
    { value: 'egg', label: 'Egg' },
    { value: 'gluten', label: 'Gluten' },
    { value: 'peanut', label: 'Peanut' },
    { value: 'sesame', label: 'Sesame' },
    { value: 'seafood', label: 'Seafood' },
    { value: 'shellfish', label: 'Shellfish' },
    { value: 'soy', label: 'Soy' }
  ];

  const loadRandomRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await getRandomRecipes(12);
      setRecipes(results);
    } catch (err) {
      setError('Error loading recipes. Please try again later.');
      console.error('Random recipes error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback(async (query = searchQuery, searchFilters = filters) => {
    if (!query.trim() && !Object.values(searchFilters).some(v => v && (Array.isArray(v) ? v.length > 0 : true))) {
      loadRandomRecipes();
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchRecipes(query, searchFilters);
      setRecipes(results);
    } catch (err) {
      setError('Error loading recipes. Please try again later.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, filters, loadRandomRecipes]);

  // Load random recipes on startup
  useEffect(() => {
    loadRandomRecipes();
  }, [loadRandomRecipes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleIntoleranceChange = (intolerance) => {
    setFilters(prev => ({
      ...prev,
      intolerances: prev.intolerances.includes(intolerance)
        ? prev.intolerances.filter(i => i !== intolerance)
        : [...prev.intolerances, intolerance]
    }));
  };

  const clearFilters = () => {
    setFilters({
      diet: '',
      cuisine: '',
      type: '',
      maxReadyTime: '',
      intolerances: []
    });
    handleSearch(searchQuery, {
      diet: '',
      cuisine: '',
      type: '',
      maxReadyTime: '',
      intolerances: []
    });
  };

  const applyFilters = () => {
    handleSearch(searchQuery, filters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Recipe App</h1>
          <p className="text-lg text-gray-600">Find the perfect recipe for every occasion</p>
        </div>
      </header>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes... (e.g. pasta, pizza, desserts)"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
          />
          <button 
            type="submit" 
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
          <button 
            type="button"
            onClick={loadRandomRecipes}
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={loading}
          >
            🎲 Random
          </button>
        </form>
      </div>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                🔍 Search Filters
              </h3>
              
              {/* Diet Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Diet</label>
                <select
                  value={filters.diet}
                  onChange={(e) => handleFilterChange('diet', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  {dietOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cuisine Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine</label>
                <select
                  value={filters.cuisine}
                  onChange={(e) => handleFilterChange('cuisine', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  {cuisineOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Dish Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  {typeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Max Ready Time Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Time (min)</label>
                <input
                  type="number"
                  value={filters.maxReadyTime}
                  onChange={(e) => handleFilterChange('maxReadyTime', e.target.value)}
                  placeholder="e.g. 30"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Intolerances */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Intolerances</label>
                <div className="space-y-2">
                  {intoleranceOptions.map(option => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.intolerances.includes(option.value)}
                        onChange={() => handleIntoleranceChange(option.value)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter Actions */}
              <div className="space-y-3">
                <button
                  onClick={applyFilters}
                  className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm"
                >
                  Apply Filters
                </button>
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors text-sm"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Error Message */}
            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600">Loading recipes...</p>
              </div>
            )}

            {/* Recipes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <CardRecipe key={recipe.id} recipe={recipe} />
              ))}
            </div>

            {/* No Results */}
            {recipes.length === 0 && !loading && !error && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No recipes found</h3>
                <p className="text-gray-600">Try searching with different terms.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
