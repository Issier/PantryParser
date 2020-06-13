import React, { useState } from 'react';
import Recipes from './components/Recipes.js'; 
import IngredientSelector from './components/IngredientSelector.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Redirect } from 'react-router-dom';

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState({})

  const updateIngredients = (ingredient) => {
     setSelectedIngredients({
      ...selectedIngredients,
      [ingredient.name]: ingredient,
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img alt="Groceries" src={"/pantryParserLogo.png"} id="groceryImage"></img>
      </header>
      <Router>
        <Switch>
          <Route exact path="/" render={() => (
            <div>
              <IngredientSelector updateIngredients={updateIngredients}></IngredientSelector>
              <Recipes selectedIngredients={selectedIngredients} updateIngredients={setSelectedIngredients}></Recipes>
            </div>
          )}
        />
        <Route exact path="/recipes/add" render={() => (
            <div>
              <h1>Not Implemented</h1>
            </div>
          )}
        />
        <Route path="*">
          <Redirect to="/"></Redirect>
        </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
