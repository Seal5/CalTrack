import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";

// creating ingredient 
function CreateIngredient(props) {
  const [ingredient, setIngredient] = useState({
    title: "",
    ingreTitle: "",
    caloriePG: "",
    weightG: "",
  });

// using useState to render each change
  function handleChange(event) {
    const { name, value } = event.target;
    setIngredient((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

// passing ingredient to App
  function sendIngredient(event) {
    props.onAdd(ingredient);
    setIngredient({
      ingreTitle: "",
      caloriePG: "",
      weightG: "",
    });
    event.preventDefault();
  }

// Returning the ingredient list in an appropriate positio according to dish entree name 
  return (
    <div>
      <form>
        <input
          placeholder="Dish name..."
          name="title"
          onChange={handleChange}
          value={ingredient.title}
        />
        <input
          placeholder="Ingredient name..."
          name="ingreTitle"
          onChange={handleChange}
          value={ingredient.ingreTitle}
        />
        <input
          type="number"
          placeholder="Calorie per gram..."
          name="caloriePG"
          onChange={handleChange}
          value={ingredient.caloriePG}
        />
        <input
          type="number"
          placeholder="Weight in grams..."
          name="weightG"
          onChange={handleChange}
          value={ingredient.weightG}
        />

        <button onClick={sendIngredient}>
          <AddIcon />
        </button>
      </form>
    </div>
  );
}

export default CreateIngredient;
