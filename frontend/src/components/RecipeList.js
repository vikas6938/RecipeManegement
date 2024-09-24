import React, { useState, useEffect } from 'react';
import axios from '../api';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    // Fetch all recipes from the API
    axios.get('/api/recipes')
      .then(response => {
        setRecipes(response.data);
        setFilteredRecipes(response.data);
      })
      .catch(error => console.log('Error fetching recipes:', error));
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);
    setFilteredRecipes(
      recipes.filter(recipe => 
        recipe.title.toLowerCase().includes(query) || 
        recipe.cuisineType.toLowerCase().includes(query) ||
        recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query))
      )
    );
  };

  return (
    
    <div className="container mt-4">
      <h1 className="display-4 mb-4">Recipe List</h1>
      <input
        type="text"
        placeholder="Search by ingredients or cuisine"
        value={search}
        onChange={handleSearch}
        className="form-control mb-4"
      />

      
      <ul className="list-group">
        {filteredRecipes.map(recipe => (
          <li key={recipe._id} className="list-group-item mb-3">
            <h2 className="h5 mb-2">{recipe.title}</h2>
            <p className="mb-1"><strong>Cuisine Type:</strong> {recipe.cuisineType}</p>
            <p className="mb-1"><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
            <a href={`/recipes/${recipe._id}`} className="btn btn-primary">View Details</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
