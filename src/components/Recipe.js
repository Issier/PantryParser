import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'

export function Recipe(props) {
    return (
        <Card className="recipe" style={{ width: '18rem' }}>
            <Card.Img variant="top" src="platePlaceholder.jpg" />
            <Card.Body>
            <Card.Title>{props.recipe["name"]}</Card.Title>
            <Card.Text>
                {props.recipe["Description"]}
            </Card.Text>
            <Button variant="primary">Learn More</Button>
            </Card.Body>
        </Card>
    )
}


export default Recipe   