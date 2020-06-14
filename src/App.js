import React, { useState } from 'react';
import Recipes from './components/Recipes.js'; 
import IngredientSelector from './components/IngredientSelector.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Redirect } from 'react-router-dom';
import AddRecipe from './components/AddRecipe.js';

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState({})
  const [recipes, setRecipes] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);


  const getRecipeList = () => {
    const ingredientQueryArgs = Object.keys(selectedIngredients).join(",")
    fetch(`http://localhost:8080/recipes?ingredients=${ingredientQueryArgs}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setRecipes(result)
        }
      )
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
              <IngredientSelector getRecipeList={getRecipeList} updateIngredients={setSelectedIngredients}></IngredientSelector>
              <Recipes recipes={recipes} updateIngredients={setSelectedIngredients}></Recipes>
            </div>
          )}
        />
        <Route exact path="/recipes/add" render={() => (
            <AddRecipe></AddRecipe>
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
