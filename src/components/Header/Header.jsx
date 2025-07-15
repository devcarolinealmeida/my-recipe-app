import React from 'react';

function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Recipe App</h1>
        <p className="text-lg text-gray-600">Find the perfect recipe for every occasion</p>
      </div>
    </header>
  );
}

export default Header;