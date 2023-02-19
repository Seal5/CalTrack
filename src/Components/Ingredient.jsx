import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function Ingredient(props) {
  // function deleteIngredient() {
  //   props.onDelete(props.id);
  // }
  
  return (
    <div className="ingredient">
      {props.id === 0 ? <h1>{props.title}</h1> : null}
      <p>{props.ingreTitle}</p>
      <p>{props.caloriePG}</p>
      <p>{props.weightG}</p>
      {/* <button onClick={deleteIngredient}>
        <DeleteIcon />
      </button> */}
    </div>
  );
}

export default Ingredient;
