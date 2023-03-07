import React, { useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Ingredient from "./Ingredient";
import CreateIngredient from "./CreateIngredient";
import NeededCalorie from "./NeededCalorie";

function App() {
  // set up states for ingredient and meal
  const [output, setOutput] = useState([]);
  const [total, setTotal] = useState(2250);
  const [meal, setMeal] = useState([]);
  var totalC = 0;

function handleAddIngredient(newIngredient) {
  addIngredient(newIngredient);
  setCalcValue();
}


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
}
// total and asking for the input of wanted calories per day

// Display output how much calorie left 

// Css style


function reamainingCal(required){
  var arrC = [];
  for (let i = 0; i < meal.length; i++) {
    let tCalorie = 0;
    for (let j = 0; j < meal[i].length; j++) {
      tCalorie += meal[i][j].weightG * meal[i][j].caloriePG;
    }
    arrC = [...arrC , tCalorie];
  }
  for (let i = 0; i < meal.length; i++) {
    totalC = totalC + arrC[i]
  }
  setTotal(required-totalC);
}

function setCalcValue() {
  var arrC = [];
  var single = [];
  var mealItems = [];
  for (let i = 0; i < meal.length; i++) {
    let tCalorie = 0;
    for (let j = 0; j < meal[i].length; j++) {
      tCalorie += meal[i][j].weightG * meal[i][j].caloriePG;
    }
    arrC = [...arrC , tCalorie];
  }
  for (let i = 0; i < meal.length; i++) {
    single = meal[i][0].title + " has " + arrC[i] + " calories";
    mealItems.push(single);
    totalC = totalC + arrC[i]
  }
  setOutput(mealItems);
}


// deleting ingredient off
function deleteIngredient(idx, idy) {
  setMeal((prevMeal) => {
    const newMeal = [...prevMeal];
    newMeal[idy] = newMeal[idy].filter((ingredient, index) => {
      return index !== idx;
    });
    return newMeal.filter((dish) => dish.length > 0);
  });
}

// extracting the entire webpage
return (
  <div>
    <Header />
    <p>Calorie Reaming: {total}</p>
    {output.map((value, index) => (
      <p key={index}>{value}</p>
    ))}
    <NeededCalorie onCalorie={reamainingCal} />
    <CreateIngredient onAdd={handleAddIngredient} />
    <table>
      <tbody>
        {meal.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((value, colIndex) => (
              <td key={colIndex}>
                <Ingredient
                  key={colIndex}
                  idy={rowIndex}
                  idx={colIndex}
                  title={value.title}
                  ingreTitle={value.ingreTitle}
                  weightG={value.weightG}
                  caloriePG={value.caloriePG}
                  onDelete={deleteIngredient}
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
    

export default App;
