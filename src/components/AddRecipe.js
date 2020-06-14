import React, {useState, useEffect} from 'react';
import { Button, Form } from 'react-bootstrap';

export function AddRecipe(props) {
    const [isSent, setIsSent] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState({ name: "", description: "", ingredients: []});

    useEffect(() => {
        fetch("http://localhost:8080/ingredients")
            .then(res => res.json())
            .then(
            (result) => {
                setIngredients(result)
            }
        )
    }, []);

    const postRecipe = () => 
        fetch(`http://localhost:8080/recipes/add`, {
            method: 'POST',
            body: JSON.stringify(recipe)
        });

    const handleOptionEvent = (event) => setRecipe({
        ...recipe,
        ingredients: [...event.target.options].filter(o => o.selected).map(o => { return {name: o.value.split(",")[0], category: o.value.split(",")[1]} })
    });

    const handleNameEvent = (event) => setRecipe({
        ...recipe,
        name: event.target.value
    });

    const handleDescriptionEvent = (event) => setRecipe({
        ...recipe,
        description: event.target.value
    });

    return (
        <Form id="newRecipe">
            <h1>New Recipe</h1>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control onChange={handleNameEvent} type="text" placeholder="Enter recipe name" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control onChange={handleDescriptionEvent} type="text" placeholder="Enter recipe description" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Ingredients</Form.Label>
                <Form.Control onChange={handleOptionEvent} as="select" multiple>
                    {
                        ingredients.map(ingredient => (
                            <option key={ingredient["name"]} value={[ingredient["name"], ingredient["category"]]}>{ingredient["name"]}</option>
                        ))
                    }
                </Form.Control>
            </Form.Group>
            <Button className="blueButtonColor"onClick={postRecipe}>Add Recipe</Button>
        </Form>
    )
      
}

export default AddRecipe;