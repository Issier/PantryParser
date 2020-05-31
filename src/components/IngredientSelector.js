import React, {useState, useEffect} from 'react';

export function IngredientSelector() {
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
                {
                    Object.keys(ingredients).map(ingredientName => (
                     <button key={ingredientName}>{ingredientName}</button>
                    ))
                }
            </div>
        )
}

export default IngredientSelector   