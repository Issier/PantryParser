import React, {useState, useEffect} from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export function IngredientSelector(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [searchIngredients, setSearchIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [lastQuery, setLastQuery] = useState("");

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

    function updateIngredientList(ingredientSearchTerm) {
        setSearchIngredients(ingredientSearchTerm === "" ? [] : ingredients.filter(ingredient => ingredient.name.includes(ingredientSearchTerm)));
        setLastQuery(ingredientSearchTerm)
    }

    let selectedIngredientsBody;

    if (lastQuery === "") {
        selectedIngredientsBody = (<span></span>)
    }
    else if (searchIngredients.length == 0) {
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
                        <Button className="ingredientButton blueButtonColor" onClick={(e) => updateIngredients(ingredient)} key={ingredient.name}>{ingredient.name}</Button>
                    ))
                }
            </Card.Body>
        );
    }

    const removeIngredient = (ingredient) => {
        let currentUpdatedIngredients = {
          ...selectedIngredients
        };
        delete currentUpdatedIngredients[ingredient]
        props.updateIngredients(currentUpdatedIngredients)
        setSelectedIngredients(currentUpdatedIngredients)
    }

    const updateIngredients = (ingredient) => {
        const newSelectedIngredients = {
            ...selectedIngredients,
            [ingredient.name]: ingredient,
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
                <div>
                    {
                        Object.keys(selectedIngredients).map(ingredient => <Button className="selectedIngredientsButton blueButtonColor" key={ingredient} onClick={() => removeIngredient(ingredient)}>{ingredient}</Button>)
                    }
                </div>
                <Button id="getRecipesButton" disabled={Object.keys(selectedIngredients).length < 1} onClick={props.getRecipeList}>Get Recipes</Button>
                </Card.Header>
                { selectedIngredientsBody }
            </Card>
        </div>
    )
}


export default IngredientSelector   