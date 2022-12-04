import React from 'react'
import Recipe from './Recipe'
import './Recipes.css'

export function Recipes (props) {
  return (
    <div id="recipes">
      {
        Object.keys(props.recipes).sort((a, b) => b - a).map(numberOfMatchingIngredients => (
          <div>
            <h1>Matching {numberOfMatchingIngredients} Ingredient(s)</h1>
            <div className="recipeSet">
              {
                props.recipes[numberOfMatchingIngredients].map(recipe => (
                  <Recipe selectedIngredients={props.selectedIngredients} key={recipe.name} recipe={recipe}></Recipe>
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Recipes
