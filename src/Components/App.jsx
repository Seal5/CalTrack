import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Ingredient from "./Ingredient";
import CreateIngredient from "./CreateIngredient";

function App() {
  const [ingredient, setIngredient] = useState([]);
  const [meal, setMeal] = useState([]);

  function addIngredient(newIngredient) {
    setIngredient((prevIngredients) => {
      return [...prevIngredients, newIngredient];
    });
    setMeal((prevMeal) => {
      return[...prevMeal, newMeal];
    })
  }
  function deleteIngredient(id) {
    setIngredient((prevIngredients) => {
      return prevIngredients.filter((ingredient, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateIngredient onAdd={addIngredient} />
      {ingredient.map((ingredient, index) => {
        return (
          <Ingredient
            key={index}
            id={index}
            title={ingredient.title}
            ingredienttitle ={ingredient.ingredientTitle}
            weightG={ingredient.weightG}
            caloriePG={ingredient.caloriePG}
            onDelete={deleteIngredient}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
