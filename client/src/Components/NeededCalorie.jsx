import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

// creating ingredient 
function NeededCalorie(props) {
  const [calorie, setCalorie] = useState(0);

// using useState to render each change
  function handleChange(event) {
    const { name, value } = event.target;
    setCalorie(value);
  }

  // passing ingredient to App
  function sendCalorie(event) {
    if(calorie > 750 && calorie <7000){
      event.preventDefault();
      props.onCalorie(calorie);
    } else{
      event.preventDefault();
      alert("Please enter a valid number!");    
    }
  }

// Returning the ingredient list in an appropriate positio according to dish entree name 
  return (
    <div>
      <form>
        <input
          placeholder="Daily calorie goal..."
          type="number"
          onChange={handleChange}
        />
        <button type="submit" onClick={sendCalorie}>
          <AddIcon />
        </button>
      </form>
    </div>
  );
}

export default NeededCalorie;
