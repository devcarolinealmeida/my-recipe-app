import { Link } from 'react-router-dom';

function CardRecipe({ recipe }) {
  return (
    <div
      key={recipe.id}
      className="card-recipe bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
    >
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
          <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
            {recipe.title}
          </h3>
          {recipe.summary && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">
              {recipe.summary.replace(/<[^>]*>/g, "").substring(0, 100)}...
            </p>
          )}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="flex items-center">
              🍽️ {recipe.servings} servings
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
  );
}
export default CardRecipe;
