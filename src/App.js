import React, { useState } from 'react';
import Recipes from './components/Recipes.js'; 
import IngredientSelector from './components/IngredientSelector.js';
import './App.css';

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState({})

  const updateIngredients = (ingredient) => {
     setSelectedIngredients({
      ...selectedIngredients,
      [ingredient.Name]: ingredient,
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img alt="Groceries" src="pantryParserLogo.png" id="groceryImage"></img>
      </header>
      <IngredientSelector updateIngredients={updateIngredients}></IngredientSelector>
      <Recipes selectedIngredients={selectedIngredients} updateIngredients={setSelectedIngredients}></Recipes>
    </div>
  );
}

export default App;
