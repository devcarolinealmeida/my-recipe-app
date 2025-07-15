import React, { useState, useEffect, useCallback } from 'react';
import { searchRecipes, getRandomRecipes } from '../../services/spoonacularApi';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';
import RecipeGrid from '../../components/RecipeGrid/RecipeGrid';

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
      <Header />
      
      <SearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSubmit={handleSubmit}
        loading={loading}
        loadRandomRecipes={loadRandomRecipes}
      />

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="flex gap-8">
          <FilterSidebar 
            filters={filters}
            handleFilterChange={handleFilterChange}
            handleIntoleranceChange={handleIntoleranceChange}
            applyFilters={applyFilters}
            clearFilters={clearFilters}
          />

          <div className="flex-1">
            <RecipeGrid 
              recipes={recipes}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
