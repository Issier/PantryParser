import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipes, setRecipes] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/recipes")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setRecipes(result)
        }
      )
  }, []);

  if (!isLoaded) {
    return <div>Loading....</div>
  }

  return (
    <div className="App">
      <header className="App-header">
        <img alt="Groceries" src="pantryParserLogo.png" id="groceryImage"></img>
      </header>
      <div id="recipes">
        {Object.keys(recipes).map(recipe => (
          <div id="mainContent">
            <h2> { recipe } </h2>
            <ol>
            {recipes[recipe]["Ingredients"].map(value => (
                <li key={value["Name"]}>{value["Name"]}</li>
            ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
