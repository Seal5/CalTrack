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

// passing ingredient to App with error checking
function sendIngredient(event) {
  if (ingredient.title.trim() === "" || ingredient.ingreTitle.trim() === "" || ingredient.caloriePG.trim() === "" || ingredient.weightG.trim() === "") {
    alert("Please fill in all values!");
    setIngredient({
      title: ingredient.title,
      ingreTitle: "",
      caloriePG: "",
      weightG: "",
    });
    event.preventDefault();
  } else if (ingredient.caloriePG*ingredient.weightG > 5000 || ingredient.caloriePG*ingredient.weightG < 0){
    alert("Please enter an appropriate value!");
    setIngredient({
      title: ingredient.title,
      ingreTitle: "",
      caloriePG: "",
      weightG: "",
    });
    event.preventDefault();
  }else {
    props.onAdd(ingredient);
    setIngredient({
      title: ingredient.title,
      ingreTitle: "",
      caloriePG: "",
      weightG: "",
    });
    event.preventDefault();
  }
}

// returning the ingredient list in an appropriate positio according to dish entree name 
  return (
    <div>
      <form className="data-input">
        <input
          type="text"
          placeholder="Dish name..."
          name="title"
          onChange={handleChange}
          value={ingredient.title}
        />
        <input
          type="text"
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
