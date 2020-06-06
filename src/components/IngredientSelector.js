import React, {useState, useEffect} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export function IngredientSelector(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/ingredients")
            .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setIngredients(result)
            }
            )
        }, []);

        return (
            <div id="ingredients">
                <h2>Ingredients</h2>
                <Accordion>
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} eventKey="0">
                            Select Ingredients
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                {
                                    ingredients.map(ingredient => (
                                        <button className="ingredientButton" onClick={(e) => props.updateIngredients(ingredient)} key={ingredient.name}>{ingredient.name}</button>
                                    ))
                                }
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        )
}


export default IngredientSelector   