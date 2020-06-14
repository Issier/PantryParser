import React from 'react';
import Recipe from './Recipe';
import { CardDeck } from 'react-bootstrap';

export function Recipes(props) {

  return (
    <div id="recipes">
      {      
        Object.keys(props.recipes).map(numberOfMatchingIngredients => (
          <div>
            <h1>Matching {numberOfMatchingIngredients} Ingredient(s)</h1>
            <CardDeck className="recipeSet">
              {
                props.recipes[numberOfMatchingIngredients].map(recipe => (
                  <Recipe selectedIngredients={props.selectedIngredients} key={recipe.name} recipe={recipe}></Recipe>
                ))
              }
            </CardDeck>
          </div>
        ))
      }
    </div>
  );
}

export default Recipes;
