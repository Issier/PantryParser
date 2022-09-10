import React, {useEffect, useState} from 'react';
import {Table, Nav, Card, Badge} from 'react-bootstrap';

export function Recipe(props) {
    const [key, setKey] = useState("overview");
    const [ingredientsMatching, setIngredientMatching] = useState([]);

    let renderBody;

    const getUrlForCorrectMark = (ingredientName) => {
        if (Object.keys(props.selectedIngredients).includes(ingredientName)) {
            return "check.png";
        } else {
            return "xmark.jpg";
        }
    }

    useEffect(() => {
        setIngredientMatching(Object.keys(props.selectedIngredients).filter((ingredientName) => {
            return props.recipe["ingredients"].map((i) => i["name"]).includes(ingredientName)
        }));
    }, []);

    const IngredientMatching = () => {
        return ingredientsMatching.map((ingredient) => {
            return <Badge bg="success" pill style={{color: 'white', padding: '6px', margin: '3px'}}>{ingredient}</Badge>
        });
    }

    if (key === 'details') {
        renderBody = (
            <div>
                <Card.Body>
                <Card.Title>{props.recipe["name"]}</Card.Title>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.recipe["ingredients"]?.map(ingredient => (
                                <tr key={ingredient["name"]}>
                                    <td>{ingredient["name"]}</td>
                                    <td>?</td>
                                    <td><img alt="check mark" src={getUrlForCorrectMark(ingredient["name"])} id="checkSymbol"></img></td>
                                </tr>
                        ))}
                    </tbody>
                </Table>
                </Card.Body>
            </div>
        )
    } else {
        renderBody = (
            <div>
                <Card.Body>
                <Card.Title>{props.recipe["name"]}</Card.Title>
                <Card.Subtitle><IngredientMatching /></Card.Subtitle>
                <Card.Text style={{marginTop: '20px'}}>
                    {props.recipe["description"]}
                </Card.Text>
                </Card.Body>
            </div>
        )
    }

    return (
        <Card className="recipe">
            <Card.Header>
                <Nav defaultActiveKey="overview" fill variant="tabs" onSelect={(selectedKey) => setKey(selectedKey)}>
                    <Nav.Item>
                        <Nav.Link eventKey="overview">Overview</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="details">Details</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            {renderBody}
        </Card>
    )
}


export default Recipe   