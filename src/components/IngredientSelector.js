import React, {useState, useEffect} from 'react';
import { Accordion, InputGroup, FormControl } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export function IngredientSelector(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [searchIngredients, setSearchIngredients] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/ingredients")
            .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setIngredients(result)
                setSearchIngredients(result)
            }
            )
        }, []);

    function updateIngredientList(ingredientSearchTerm) {
        setSearchIngredients(ingredients.filter(ingredient => ingredient.name.includes(ingredientSearchTerm)));
    }

    let selectedIngredientsBody;

    if (searchIngredients.length == 0) {
        selectedIngredientsBody = (
            <Card.Body>
                <div>No Ingredients Found Matching Search String</div>
            </Card.Body>
        );
    } else {
        selectedIngredientsBody = (
            <Card.Body>
                {
                    searchIngredients.map(ingredient => (
                        <button className="ingredientButton" onClick={(e) => props.updateIngredients(ingredient)} key={ingredient.name}>{ingredient.name}</button>
                    ))
                }
            </Card.Body>
        );
    }

    return (
        <div id="ingredients">
            <Card>
                <Card.Header>
                <Card.Title>Select Ingredients</Card.Title>
                <InputGroup className="mb-3" onChange={(e) => updateIngredientList(e.target.value)}>
                    <FormControl
                        placeholder="Filter ingredients"
                        aria-label="Filter ingredients"
                        aria-describedby="basic-addon2"
                    />
                </InputGroup>
                </Card.Header>
                { selectedIngredientsBody }
            </Card>
        </div>
    )
}


export default IngredientSelector   