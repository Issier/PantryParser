import React, { useState } from 'react'
import Recipes from './components/Recipes.js'
import IngredientSelector from './components/IngredientSelector.js'
import './App.css'
import AddRecipe from './components/AddRecipe.js'
import AddIngredient from './components/AddIngredient.js'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

function App () {
  const [selectedIngredients, setSelectedIngredients] = useState({})
  const [recipes, setRecipes] = useState({})
  const [showAddRecipe, setShowAddRecipe] = useState(false)
  const [showAddIngredient, setShowAddIngredient] = useState(false)

  const getRecipeList = () => {
    const ingredientQueryArgs = Object.keys(selectedIngredients).join(',')
    fetch(`http://localhost:8080/recipes?ingredients=${ingredientQueryArgs}`)
      .then(res => res.json())
      .then(
        (result) => {
          setRecipes(result)
        }
      )
  }

  const recipeFormCloseHandler = (recipeAdded) => {
    setShowAddRecipe(false)
  }

  const ingredientFormCloseHandler = (ingredientAdded) => {
    setShowAddIngredient(false)
  }

  return (
    <div className="App">
      <AddRecipe show={showAddRecipe} onFormClose={recipeFormCloseHandler}/>
      <AddIngredient show={showAddIngredient} onFormClose={ingredientFormCloseHandler}/>
      <header className="App-header">
        <Navbar collapseOnSelect bg="light" variant="light">
          <NavDropdown id="collasible-nav-dropdown navItemsMobile">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link onClick={() => setShowAddRecipe(true)}>Add Recipe</Nav.Link>
            <Nav.Link onClick={() => setShowAddIngredient(true)}>Add Ingredient</Nav.Link>
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
            <Nav.Link onClick={() => setShowAddRecipe(true)}>Add Recipe</Nav.Link>
            <Nav.Link onClick={() => setShowAddIngredient(true)}>Add Ingredient</Nav.Link>
            <Nav.Link className="navItemsDesktop" target="_" href="https://github.com/Issier/PantryParser">Github</Nav.Link>
          </Nav>
        </Navbar>
      </header>
      <div>
        <IngredientSelector getRecipeList={getRecipeList} updateIngredients={setSelectedIngredients}></IngredientSelector>
        <Recipes selectedIngredients={selectedIngredients} recipes={recipes} updateIngredients={setSelectedIngredients}></Recipes>
      </div>
    </div>
  )
}

export default App
