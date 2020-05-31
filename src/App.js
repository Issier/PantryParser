import React from 'react';
import Recipes from './recipes/Recipes.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img alt="Groceries" src="pantryParserLogo.png" id="groceryImage"></img>
      </header>
      <Recipes></Recipes>
    </div>
  );
}

export default App;
