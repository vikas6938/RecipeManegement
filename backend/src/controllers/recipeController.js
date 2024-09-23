const Recipe = require('../models/Recipe');

// Create new recipe
const createRecipe = async (req, res) => {
  const { title, ingredients, instructions, cuisineType } = req.body;

  try {
    const recipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      cuisineType,
      author: req.user._id,
    });
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all recipes
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('author', 'username');
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a recipe by ID
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('author', 'username');
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a recipe
const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (recipe && recipe.author.toString() === req.user._id.toString()) {
      recipe.title = req.body.title || recipe.title;
      recipe.ingredients = req.body.ingredients || recipe.ingredients;
      recipe.instructions = req.body.instructions || recipe.instructions;
      recipe.cuisineType = req.body.cuisineType || recipe.cuisineType;

      const updatedRecipe = await recipe.save();
      res.status(200).json(updatedRecipe);
    } else {
      res.status(404).json({ message: 'Recipe not found or unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
  try {
      const recipe = await Recipe.findByIdAndDelete(req.params.id);
      if (!recipe) {
          return res.status(404).json({ message: 'Recipe not found' });
      }
      res.status(200).json({ message: 'Recipe deleted' });
  } catch (err) {
      res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createRecipe, getRecipes, getRecipeById, updateRecipe, deleteRecipe };
