import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";

function CreateIngredient(props) {
  const [ingredient, setIngredient] = useState({
    title: "",
    ingreTitle: "",
    caloriePG: "",
    weightG: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setIngredient((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function addIngre(event) {
    props.onAdd(ingredient);
    setIngredient({
      title: "",
      ingreTitle: "",
      caloriePG: "",
      weightG: "",
    });
    event.preventDefault();
  }

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
          placeholder="Calorie per gram..."
          name="caloriePG"
          onChange={handleChange}
          value={ingredient.caloriePG}
        />
        <input
          placeholder="Weight in grams..."
          name="weightG"
          onChange={handleChange}
          value={ingredient.weightG}
        />

        <button onClick={addIngre}>
          <AddIcon />
        </button>
      </form>
    </div>
  );
}

export default CreateIngredient;
