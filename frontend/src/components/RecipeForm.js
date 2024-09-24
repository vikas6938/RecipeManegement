import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api';


const RecipeForm = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    cuisineType: '',
    cookingTime: ''
  });

  useEffect(() => {
    if (isEdit) {
      axios.get(`/recipes/${id}`)
        .then(response => setRecipe(response.data))
        .catch(error => console.error('Error fetching recipe:', error));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = isEdit ? 'put' : 'post';
    const url = isEdit ? `/recipes/${id}` : '/recipes';

    axios[method](url, recipe)
      .then(() => {
        navigate('/'); // Navigate back to home after form submission
      })
      .catch(error => console.error('Error saving recipe:', error));
  };

  return (
    <div className="recipe-form-bg">
      <div className="container d-flex justify-content-center align-items-center ms-auto">
        <div className="form-container p-5 bg-white rounded shadow ">
          <h2 className="text-center mb-4">{isEdit ? 'Edit Recipe' : 'Create Recipe'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                value={recipe.title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ingredients (comma separated)</label>
              <input
                type="text"
                name="ingredients"
                value={recipe.ingredients}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Instructions</label>
              <textarea
                name="instructions"
                value={recipe.instructions}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Cuisine Type</label>
              <input
                type="text"
                name="cuisineType"
                value={recipe.cuisineType}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Cooking Time (minutes)</label>
              <input
                type="number"
                name="cookingTime"
                value={recipe.cookingTime}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              {isEdit ? 'Update Recipe' : 'Create Recipe'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
