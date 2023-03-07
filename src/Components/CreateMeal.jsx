import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";

// creating ingredient
function CreateMeal(props) {
  const [meal, setMeal] = useState({
    title: "",
    caloriePG: "",
    weightG: 1,
  });

  // using useState to render each change
  function handleChange(event) {
    const { name, value } = event.target;
    setMeal((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  // passing ingredient to App
  function sendMeal(event) {
    props.onAdd(meal);
    setMeal({
      title: "",
      caloriePG: "",
      weightG: 1,
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
          value={meal.title}
        />
        <input
          type="number"
          placeholder="Calorie of the dish..."
          name="caloriePG"
          onChange={handleChange}
          value={meal.caloriePG}
        />
        <button onClick={sendMeal}>
          <AddIcon />
        </button>
      </form>
    </div>
  );
}

export default CreateMeal;