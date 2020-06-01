import React, {useState, useEffect} from 'react';
import Recipe from './Recipe';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function Recipes(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipes, setRecipes] = useState({});

  const getRecipeList = () => {
    const ingredientQueryArgs = Object.keys(props.selectedIngredients).join(",")
    fetch(`http://localhost:8080/recipes?ingredients=${ingredientQueryArgs}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setRecipes(result)
        }
      )
  }

  const removeIngredient = (ingredient) => {
    let currentUpdatedIngredients = {
      ...props.selectedIngredients
    };
    delete currentUpdatedIngredients[ingredient]
    props.updateIngredients(currentUpdatedIngredients)
  }

  return (
    <Container id="recipes">
        <Row>
          <Col/>
          <h2>Recipes Including</h2>
          <Col/>
        </Row>
        <Row>
          <Col/>
            {
              Object.keys(props.selectedIngredients).map(ingredient => <button onClick={() => removeIngredient(ingredient)}>{ingredient}</button>)
            }
          <Col/>
        </Row>
        <Row>
          <Col/>
            <button disabled={Object.keys(props.selectedIngredients).length < 1} onClick={getRecipeList}>Get Recipes</button>
          <Col/>
        </Row>
          {      
            Object.keys(recipes).map(matchingIngredients => (
              <div>
                <Row><Col/><h2> Matching { matchingIngredients } Ingredient(s)</h2><Col/></Row>
                <Row>
                  <Col/>
                  {recipes[matchingIngredients].map(recipe => (
                    <Recipe recipe={recipe}></Recipe>
                  ))}
                  <Col/>
                </Row>
              </div>
            ))
          }
    </Container>
  );
}

export default Recipes;
