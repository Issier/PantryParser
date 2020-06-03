import React, { useState } from 'react';
import Recipes from './components/Recipes.js'; 
import IngredientSelector from './components/IngredientSelector.js';
import Route from 'react-router-dom/Route';
import './App.css';
import { Redirect } from 'react-router-dom';

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
        <img alt="Groceries" src={"/pantryParserLogo.png"} id="groceryImage"></img>
      </header>
      <Route 
        exact 
        path="/" 
        render={() => (
          <div>
            <IngredientSelector updateIngredients={updateIngredients}></IngredientSelector>
            <Recipes selectedIngredients={selectedIngredients} updateIngredients={setSelectedIngredients}></Recipes>
          </div>
        )}
      />
      <Route 
        exact 
        path="/recipes/add" 
        render={() => (
          <div>
            <h1>Not Implemented</h1>
          </div>
        )}
      />
      <Route path="*">
        <Redirect to="/"></Redirect>
      </Route>
    </div>
  );
}

export default App;
