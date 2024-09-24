import React from 'react';
import RecipeForm from '../components/RecipeForm';

const AddRecipePage = () => {
  return (
    <div className=''>
      <h1 className="text-2xl font-bold mb-4">Add New Recipe</h1>
      <RecipeForm isEdit={false} />
    </div>
  );
};

export default AddRecipePage;
