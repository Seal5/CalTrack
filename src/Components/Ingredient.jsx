import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function Ingredient(props) {
  function deleteIngredient() {
    props.onDelete(props.idx, props.idy);
  }

  return (
    <div className="ingredient">
      {props.ingreTitle ? <p>Ingredient Name: {props.ingreTitle}</p> : null}
      <p>Amount of Calories: {props.weightG * props.caloriePG}</p>
      <button onClick={deleteIngredient}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Ingredient;
