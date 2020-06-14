import React, {useState, useEffect} from 'react';
import Recipe from './Recipe';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function Recipes(props) {

  return (
    <Container id="recipes">
          {      
            Object.keys(props.recipes).map(numberOfMatchingIngredients => (
              <div key={numberOfMatchingIngredients}>
                <Row><Col/><h2> Matching { numberOfMatchingIngredients } Ingredient(s)</h2><Col/></Row>
                <Row>
                  <Col/>
                  {props.recipes[numberOfMatchingIngredients].map(recipe => (
                    <Recipe key={recipe.name} recipe={recipe}></Recipe>
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
