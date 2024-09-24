import React from 'react';
import RecipeForm from '../components/RecipeForm';

const EditRecipePage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Recipe</h1>
      <RecipeForm isEdit={true} />
    </div>
  );
};

export default EditRecipePage;
