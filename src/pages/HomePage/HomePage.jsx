import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { searchRecipes, getRandomRecipes } from '../../services/spoonacularApi';


function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadRandomRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await getRandomRecipes(12);
      setRecipes(results);
    } catch (err) {
      setError('Errore nel caricamento delle ricette. Riprova più tardi.');
      console.error('Random recipes error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback(async (query = searchQuery) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchRecipes(query);
      setRecipes(results);
    } catch (err) {
      setError('Errore nel caricamento delle ricette. Riprova più tardi.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  // Carica ricette casuali all'avvio
  useEffect(() => {
    loadRandomRecipes();
  }, [loadRandomRecipes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Recipe App</h1>
          <p className="text-lg text-gray-600">Trova la ricetta perfetta per ogni occasione</p>
        </div>
      </header>

      {/* Search Container */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cerca ricette... (es. pasta, pizza, dolci)"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
          />
          <button 
            type="submit" 
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={loading}
          >
            {loading ? 'Cercando...' : 'Cerca'}
          </button>
        </form>

        {/* Random Recipes Button */}
        <div className="flex justify-center mb-8">
          <button 
            onClick={loadRandomRecipes}
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={loading}
          >
            🎲 Ricette Casuali
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Caricamento ricette...</p>
          </div>
        )}

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <Link to={`/detail/${recipe.id}`} className="block">
                <div className="relative">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                    {recipe.readyInMinutes} min
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">{recipe.title}</h3>
                  {recipe.summary && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {recipe.summary.replace(/<[^>]*>/g, '').substring(0, 100)}...
                    </p>
                  )}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center">
                      🍽️ {recipe.servings} porzioni
                    </span>
                    {recipe.healthScore && (
                      <span className="flex items-center">
                        💚 {recipe.healthScore}/100
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* No Results */}
        {recipes.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Nessuna ricetta trovata</h3>
            <p className="text-gray-600">Prova con un altro termine di ricerca.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
