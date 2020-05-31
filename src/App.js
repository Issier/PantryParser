import React from 'react';
import Recipes from './components/Recipes.js'; 
import IngredientSelector from './components/IngredientSelector.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img alt="Groceries" src="pantryParserLogo.png" id="groceryImage"></img>
      </header>
      <IngredientSelector></IngredientSelector>
      <Recipes></Recipes>
    </div>
  );
}

export default App;
