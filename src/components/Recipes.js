import React, {useState, useEffect} from 'react';
import Recipe from './Recipe';

export function Recipes(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipes, setRecipes] = useState({});

  const getRecipeList = () => {
    const ingredientQueryArgs = Object.keys(props.selectedIngredients).join(",")
    fetch(`http://localhost:8080/recipes?ingredients=${ingredientQueryArgs}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setRecipes(result)
        }
      )
  }

  const removeIngredient = (ingredient) => {
    let currentUpdatedIngredients = {
      ...props.selectedIngredients
    };
    delete currentUpdatedIngredients[ingredient]
    props.updateIngredients(currentUpdatedIngredients)
  }

  return (
    <div id="recipes">
      <h2>Recipes Including</h2>
      <div id="selectedIngredients">
        {
          Object.keys(props.selectedIngredients).map(ingredient => <button onClick={() => removeIngredient(ingredient)}>{ingredient}</button>)
        }
      </div>
      <div>
        <button disabled={Object.keys(props.selectedIngredients).length < 1} onClick={getRecipeList}>Get Recipes</button>
      </div>
      {      
        Object.keys(recipes).map(matchingIngredients => (
            <div id="mainContent">
            <h2> Matching { matchingIngredients } Ingredient(s)</h2>
            {recipes[matchingIngredients].map(recipe => (
              <Recipe recipe={recipe}></Recipe>
            ))}
            </div>
        ))
      }
    </div>
  );
}

export default Recipes;
