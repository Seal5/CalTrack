import React from "react";

function Calculated(props) {
    var mealItems = ""
    for(let i = 0; i < props.meal.length; i++){
        mealItems = mealItems + "\n" + props.meal[i][0].title + "has" + props.calculatedValues[i] + "calories"
    }

    return <p>{mealItems}</p>;
}
export default Calculated;