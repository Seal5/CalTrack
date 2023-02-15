import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";

function CreateMeal(props) {
  const [ingredient, setIngredient] = useState({
    title: "",
    caloriePG: "",
    weightG: "",
  });

  function addIngredient(newIngredient) {
  setIngredient((prevNotes) => {
    return [...prevNotes, newNote];
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

  function handleClick(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
    event.preventDefault();
  }
  const [title , setTitle] = useState(false)
  function onAddNote() {
    setTitle(true);
  }
  return (
    <div>
      <form>
        <input
          placeholder="Ingredient name..."
          name="title"
          onChange={handleChange}
          value={ingredient.title}
        /> 
        <input
          placeholder="Calorie per gram..."
          name="caloriePG"
          onChange={handleChange}
          value={ingredient.caloriePG}
        /> 
        <input
          placeholder="Weigh in grams..."
          name="weightG"
          onChange={handleChange}
          value={ingredient.weightG}
        /> 
        <button onClick={addIngredient}>
          <AddIcon />
        </button>
      </form>
    </div>
  );
}

export default CreateMeal;
