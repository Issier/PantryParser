import React, {useState, useEffect} from 'react';

export function IngredientSelector(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [ingredients, setIngredients] = useState({});

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
                {
                    Object.keys(ingredients).map(ingredientName => (
                     <button class="ingredientButton" onClick={(e) => props.updateIngredients(ingredients[ingredientName])} key={ingredientName}>{ingredientName}</button>
                    ))
                }
            </div>
        )
}


export default IngredientSelector   