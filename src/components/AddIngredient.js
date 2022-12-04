import React, { useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'

const AddIngredient = (props) => {
  const [ingredientName, setIngredientName] = useState('')
  const [ingredientCategory, setIngredientCategory] = useState('')

  const nameChangeHandler = (event) => {
    setIngredientName(event.target.value)
  }

  const categoryChangeHandler = (event) => {
    setIngredientCategory(event.target.value)
  }

  const submitHandler = () => {
    fetch('http://localhost:8080/ingredients/add', {
      method: 'POST',
      body: JSON.stringify({ name: ingredientName, category: ingredientCategory })
    }).then(() => {
      props.onFormClose(true)
    })
  }

  const cancelHandler = () => {
    props.onFormClose(false)
  }

  return <Modal show={props.show}>
        <Modal.Header>
            <Modal.Title>Add Ingredient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={nameChangeHandler}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control onChange={categoryChangeHandler}/>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={cancelHandler}>Cancel</Button>
            <Button variant="primary" onClick={submitHandler}>Submit</Button>
        </Modal.Footer>
    </Modal>
}

export default AddIngredient
