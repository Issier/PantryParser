import React, { useState, useEffect } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';

export function AddRecipe(props) {
    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState({ name: "", description: "", ingredients: [] });


    useEffect(() => {
        fetch("http://localhost:8080/ingredients")
            .then(res => res.json())
            .then(
                (result) => {
                    setIngredients(result)
                }
            )
    }, []);

    const closeRecipeLinkHandler = () => {
        props.setShow(false);
    }

    const submitRecipe = () => {
        fetch(`http://localhost:8080/recipes/add`, {
            method: 'POST',
            body: JSON.stringify(recipe)
        }).then(() => {
            props.setShow(false);
        });
    }

    const handleOptionEvent = (event) => setRecipe({
        ...recipe,
        ingredients: [...event.target.options].filter(o => o.selected).map(o => { return { name: o.value.split(",")[0], category: o.value.split(",")[1] } })
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
        <Modal show={props.show}>
            <Modal.Header closeButton={closeRecipeLinkHandler}>
                <Modal.Title>Add Recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="newRecipe">
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
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeRecipeLinkHandler}>
                    Close
                </Button>
                <Button variant="primary" onClick={submitRecipe}>
                    Save Recipe
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

export default AddRecipe;