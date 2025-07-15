import React from 'react';

function FilterSidebar({ 
  filters, 
  handleFilterChange, 
  handleIntoleranceChange, 
  applyFilters, 
  clearFilters 
}) {
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

  return (
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
  );
}

export default FilterSidebar;