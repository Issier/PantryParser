import React, { useState } from 'react';
import Recipes from './components/Recipes.js'; 
import IngredientSelector from './components/IngredientSelector.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Redirect } from 'react-router-dom';
import AddRecipe from './components/AddRecipe.js';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

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
        <Navbar collapseOnSelect bg="light" variant="light">
          <NavDropdown id="collasible-nav-dropdown navItemsMobile">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/recipes/add">Add Recipe</Nav.Link>
            <Nav.Link target="_" href="https://github.com/Issier/PantryParser">Github</Nav.Link>
          </NavDropdown>
          <Navbar.Brand href="/"> 
          <img
            alt="apple"
            src="/apple.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Pantry Parser 
          </Navbar.Brand>
          <Nav>
            <Nav.Link className="navItemsDesktop" href="/">Home</Nav.Link>
            <Nav.Link className="navItemsDesktop" href="/recipes/add">Add Recipe</Nav.Link>
            <Nav.Link className="navItemsDesktop" target="_" href="https://github.com/Issier/PantryParser">Github</Nav.Link>
          </Nav>
        </Navbar>
        <img alt="Groceries" src={"/pantryParserLogo.png"} id="groceryImage"></img>
      </header>
      <Router>
        <Switch>
          <Route exact path="/" render={() => (
            <div>
              <IngredientSelector getRecipeList={getRecipeList} updateIngredients={setSelectedIngredients}></IngredientSelector>
              <Recipes selectedIngredients={selectedIngredients} recipes={recipes} updateIngredients={setSelectedIngredients}></Recipes>
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
