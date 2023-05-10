import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchRecipeById,
  fetchIngredients,
} from "../services/recipes.service";

function RecipeUpdate() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");

  useEffect(() => {
    const getRecipe = async () => {
      const result = await fetchRecipeById(id);
      setRecipe(result);
    };
    getRecipe();

    const getIngredients = async () => {
      const result = await fetchIngredients();
      setIngredients(result);
    };
    getIngredients();
  }, [id]);

  const handleIngredientChange = (event, index) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index].quantity = event.target.value;
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  const handleNewIngredientChange = (event) => {
    setNewIngredient(event.target.value);
  };

  const handleAddIngredient = () => {
    const newIngredients = [...recipe.ingredients];
    const newIngredientObj = ingredients.find(
      (item) => item.name === newIngredient
    );
    if (newIngredientObj) {
      newIngredients.push({ id: newIngredientObj.id, quantity: "" });
      setRecipe({ ...recipe, ingredients: newIngredients });
      setNewIngredient("");
    }
  };

  return (
    <div className="recipe-update">
      {recipe && ingredients.length > 0 && (
        <>
          {recipe.ingredients.map((ingredient, index) => {
            const ingredientInfo = ingredients.find(
              (item) => item.id === ingredient.id
            );
            return (
              <div key={ingredient.id}>
                <input
                  type="text"
                  value={ingredient.quantity}
                  onChange={(event) => handleIngredientChange(event, index)}
                />
                <label> {ingredientInfo.name}</label>
              </div>
            );
          })}
          <div>
            <select value={newIngredient} onChange={handleNewIngredientChange}>
              <option value="">Select a new ingredient</option>
              {ingredients.map((ingredient) => (
                <option key={ingredient.id} value={ingredient.name}>
                  {ingredient.name}
                </option>
              ))}
            </select>
            <button onClick={handleAddIngredient}>Add</button>
          </div>
        </>
      )}
    </div>
  );
}

export default RecipeUpdate;
