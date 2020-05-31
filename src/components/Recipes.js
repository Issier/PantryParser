import React, {useState, useEffect} from 'react';

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
        <button onClick={getRecipeList}>Get Recipes</button>
      </div>
      {      
        Object.keys(recipes).map(recipe => (
            <div id="mainContent">
            <h2> Matching { recipe } Ingredient(s)</h2>
            {recipes[recipe].map(value => (
                <div key={value["Name"]}>{value["Name"]}</div>
            ))}
            </div>
        ))
      }
    </div>
  );
}

export default Recipes;
