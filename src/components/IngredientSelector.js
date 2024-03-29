import React, { useState, useEffect } from 'react'
import { InputGroup, FormControl } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './IngredientSelector.css'

export function IngredientSelector (props) {
  const [ingredients, setIngredients] = useState([])
  const [searchIngredients, setSearchIngredients] = useState([])
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [ingredientSearchTerm, setIngredientSearchTerm] = useState('')

  useEffect(() => {
    fetch('http://localhost:8080/ingredients')
      .then(res => res.json())
      .then(
        (result) => {
          setIngredients(result)
        }
      )
  }, [])

  function updateIngredientList (ingredientSearchTerm) {
    setIngredientSearchTerm(ingredientSearchTerm)
    setSearchIngredients(ingredientSearchTerm === '' ? [] : ingredients.filter(ingredient => ingredient.name.includes(ingredientSearchTerm)))
  }

  let selectedIngredientsBody

  if (!ingredientSearchTerm) {
    selectedIngredientsBody = <span></span>
  } else if (searchIngredients.length === 0) {
    selectedIngredientsBody = (
            <Card.Body>
                <div>No Ingredients Found Matching Search String</div>
            </Card.Body>
    )
  } else {
    selectedIngredientsBody = (
            <Card.Body style={{ width: '90%', marginLeft: '5%' }}>
                {
                    searchIngredients.sort((a, b) => a.name < b.name ? -1 : 1).map(ingredient => (
                        <Button className="ingredientButton blueButtonColor" onClick={(e) => updateIngredients(ingredient)} key={ingredient.name}>{ingredient.name}</Button>
                    ))
                }
            </Card.Body>
    )
  }

  const removeIngredient = (ingredient) => {
    const currentUpdatedIngredients = {
      ...selectedIngredients
    }
    delete currentUpdatedIngredients[ingredient]
    props.updateIngredients(currentUpdatedIngredients)
    setSelectedIngredients(currentUpdatedIngredients)
  }

  const updateIngredients = (ingredient) => {
    const newSelectedIngredients = {
      ...selectedIngredients,
      [ingredient.name]: ingredient
    }
    setSelectedIngredients(newSelectedIngredients)
    props.updateIngredients(newSelectedIngredients)
  }

  return (
        <div id="ingredients">
            <Card>
                <Card.Header>
                <Card.Title>Select Ingredients</Card.Title>
                <InputGroup className="mb-3" id="ingredientSearchBar" onChange={(e) => updateIngredientList(e.target.value)}>
                    <FormControl
                        placeholder="Filter Ingredients"
                        aria-label="Filter Ingredients"
                        aria-describedby="basic-addon2"
                    />
                </InputGroup>
                { selectedIngredientsBody }
                </Card.Header>
                <Card.Body>
                    <div>
                        {
                            Object.keys(selectedIngredients).map(ingredient => <Button className="selectedIngredientsButton blueButtonColor" key={ingredient} onClick={() => removeIngredient(ingredient)}>{ingredient}</Button>)
                        }
                    </div>
                    {Object.keys(selectedIngredients).length >= 1 && <Button id="getRecipesButton" onClick={props.getRecipeList}>Get Recipes</Button>}
                </Card.Body>
            </Card>
        </div>
  )
}

export default IngredientSelector
