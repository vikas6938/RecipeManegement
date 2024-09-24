import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // useNavigate instead of useHistory
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`/recipes/${id}`)
      .then(response => setRecipe(response.data))
      .catch(error => console.error('Error fetching recipe:', error));
  }, [id]);

  const handleDelete = () => {
    axios.delete(`/recipes/${id}`)
      .then(() => {
        navigate('/'); // Navigate to the home page after deletion
      })
      .catch(error => console.error('Error deleting recipe:', error));
  };

  return (
    recipe ? (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>
        <p><strong>Cuisine:</strong> {recipe.cuisineType}</p>
        <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
        <p><strong>Instructions:</strong> {recipe.instructions}</p>
        <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>

        <div className="mt-4">
          <button
            onClick={() => navigate(`/edit/${id}`)} // Navigate to edit page
            className="bg-blue-500 text-white px-4 py-2 mr-4 rounded"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    ) : (
      <p>Loading recipe details...</p>
    )
  );
};

export default RecipeDetail;
