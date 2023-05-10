import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchRecipes } from "../services/recipes.service";
import "./RecipeList.css";
import "./updateRecepie"

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const result = await fetchRecipes();
      setRecipes(result);
    };
    getRecipes();
  }, []);

  const [showSteps, setShowSteps] = useState(false);
  const [currentSteps, setCurrentSteps] = useState([]);

  const handleShowSteps = (steps) => {
    if (steps && steps.length > 0) {
      setCurrentSteps(steps);
      setShowSteps(!showSteps);
    }
  };

  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-card">
          <div className="category-card">
          <Link to={`/recipes/${recipe.id}/update`}>Update</Link>


            <p>{recipe.title}</p>
            <p>{recipe.category}</p>
            {recipe.steps && recipe.steps.length > 0 && (
            <div className="steps">
              <p onClick={() => handleShowSteps(recipe.steps)}>
                Show Steps
              </p>
              {showSteps && currentSteps.length > 0 && (
                <ul>
                  {currentSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
          </div>
          
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
