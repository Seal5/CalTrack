import React, { useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Ingredient from "./Ingredient";
import Calculated from "./Calculated";
import CreateIngredient from "./CreateIngredient";

function App() {
  // set up states for ingredient and meal
  const [output, setOutput] = useState([]);
  const [meal, setMeal] = useState([]);
  const [calculatedValues, setCalculatedValues] = useState();


function addIngredient(newIngredient) {
  // Check if the ingredient already exists in the meal
  for (let i = 0; i < meal.length; i++) {
    if (meal[i][0].title === newIngredient.title) {
      const newMeal = [...meal]; 
      newMeal[i] = [...newMeal[i], newIngredient];
      setMeal(newMeal);
      return; 
    }
  }

  // Ingredient doesn't exist, so add it to a new dish
  const newMeal = [...meal]; 
  newMeal.push([newIngredient]); 
  setMeal(newMeal); 
  setCalcValue();
}

// 
useEffect(() => {
  const intervalId = setInterval(() => {
    setCalcValue();
  }, 1);
    return () => clearInterval(intervalId);
  }, [meal]);

function setCalcValue() {
  const arrC = [];
  for (let i = 0; i < meal.length; i++) {
    let tCalorie = 0;
    for (let j = 0; j < meal[i].length; j++) {
      tCalorie += meal[i][j].weightG / meal[i][j].caloriePG;
    }
    arrC.push(tCalorie);
  }
  setCalculatedValues(arrC);
  setCalcOutput(arrC);
}

  for (let i = 0; i < meal.length; i++) {
    let tCalorie = 0;
    for (let j = 0; j < meal[i].length; j++) {
      tCalorie += meal[i][j].weightG / meal[i][j].caloriePG;
    }
    arrC.push(tCalorie);
  }
  setCalculatedValues(arrC);
  setCalcOutput(arrC);
}


function setCalcOutput(arrC){
  let mealItems = [];
  let single = "";
    for(let i = 0; i < meal.length; i++){
        single = meal[i][0].title + " has " + arrC[i] + " calories";
        mealItems.push(single);
    }
    setOutput(mealItems);
}

// deleting ingredient off
// function deleteIngredient(id) {
//   setMeal((prevIngredients) => {
//     return prevIngredients.filter((ingredient, index) => {
//       return index !== id;
//     });
//   });
// }

// extracting the entire webpage
return (
  <div>
    <Header />
    {output.map((value, index) => (
      <p key={index}>{value}</p>
    ))}
    {}
    <CreateIngredient onAdd={addIngredient} />
    <table>
      <tbody>
        {meal.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((value, colIndex) => (
              <td key={colIndex}>
                <Ingredient
                  key={colIndex}
                  id={colIndex}
                  title={value.title}
                  ingreTitle={value.ingreTitle}
                  weightG={value.weightG}
                  caloriePG={value.caloriePG}
                  // onDelete={deleteIngredient}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    <Footer />
  </div>
);

}
      // <div>
      //   <Header />
      //   <CreateIngredient onAdd={addIngredient} />
      //   {meal.map((dish, index) => (
      //     <div key={index}>
      //       <h2>{dish[0].title}</h2>
      //       {dish.slice(1).map((ingredient, index) => (
      //         <Ingredient
      //           key={index}
      //           title={ingredient.title}
      //           ingreTitle={ingredient.ingreTitle}
      //           caloriePG={ingredient.caloriePG}
      //           weightG={ingredient.weightG}
      //         />
      //       ))}
      //     </div>
      //   ))}
      //   <Footer />
      // </div>;


export default App;
