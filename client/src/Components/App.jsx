import React, { useState, useEffect} from "react";
import Axios from 'axios';
import Header from "./Header";
import Footer from "./Footer";
import Ingredient from "./Ingredient";
import CreateIngredient from "./CreateIngredient";
import CreateMeal from "./CreateMeal";
import NeededCalorie from "./NeededCalorie";

function App() {
  // set up states for ingredient and meal
  const [output, setOutput] = useState([]);
  const[remaining, setRemaining] = useState();
  const [total, setTotal] = useState(2250);
  const [meal, setMeal] = useState([]);

// const addToList = () => {
//   Axios.post("http://localhost:3001/insert", {
//     meal: meal
//   });
// };

// use effect to load proper values
useEffect(() => {
  setCalcValue();
  remainingCal(total);
  addToList();
}, [meal]);

useEffect(() => {
  remainingCal(total);
}, [total]);

useEffect(() => {

}, [remaining]);

// handling all times when meal is added 
function handleAddIngredient(newIngredient, newMeal) {
  if(newIngredient !== null){
    addIngredient(newIngredient);
  }
  else if(newMeal !== null){
    addMeal(newMeal);
  }
}

// setting total caloric values for each meal
function setCalcValue() {
  var totalC = 0;
  var arrC = [];
  var single = [];
  var mealItems = [];
  for (let i = 0; i < meal.length; i++) {
    let tCalorie = 0;
    for (let j = 0; j < meal[i].length; j++) {
      tCalorie += meal[i][j].weightG * meal[i][j].caloriePG;
    }
    arrC = [...arrC, tCalorie];
  }
  for (let i = 0; i < meal.length; i++) {
    single = meal[i][0].title + " has " + arrC[i] + " calories";
    mealItems.push(single);
    totalC = totalC + arrC[i];
  }
  setOutput(mealItems);
}

// adding ingredient for meals with multiple ingredient s 
function addIngredient(newIngredient) {
  // Check if the ingredient already exists in the meal
  for (let i = 0; i < meal.length; i++) {
    if (meal[i][0].title === newIngredient.title) {
      const newMeal = [...meal];
      newMeal[i] = [...newMeal[i], newIngredient];
      setMeal(newMeal);
      remainingCal(total);
      return;
    }
  }
  // Ingredient doesn't exist, so add it to a new dish
  const newMeal = [...meal];
  newMeal.push([newIngredient]);
  setMeal(newMeal);
  remainingCal(total);
}

// adding meals straight forward the caloric values are already known 
function addMeal(knownFood) {
  // Check if the ingredient already exists in the meal
  for (let i = 0; i < meal.length; i++) {
    if (meal[i][0].title === knownFood.title) {
      const newMeal = [...meal];
      newMeal[i] = [knownFood];
      setMeal(newMeal);
      remainingCal(total);
      return;
    }
  }
  // Ingredient doesn't exist, so add it to a new dish
  const newMeal = [...meal];
  newMeal.push([knownFood]);
  setMeal(newMeal);
  remainingCal(total);
}

// calculating remaining calories
function remainingCal(required) {
  setTotal(required); 
  let totalC = 0;
  let arrC = [];

  for (let i = 0; i < meal.length; i++) {
    let tCalorie = 0;
    for (let j = 0; j < meal[i].length; j++) {
      tCalorie += meal[i][j].weightG * meal[i][j].caloriePG;
    }
    arrC = [...arrC, tCalorie];
  }

  for (let i = 0; i < meal.length; i++) {
    totalC += arrC[i];
  }
  setRemaining(total - totalC);
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
  <div className="output">
    <Header />
    {remaining < 0? <p className="remaining">Calorie Lost Needed: {-remaining}</p>  :<p className="remaining">Calorie Remaing: {remaining}</p>}
    {output.map((value, index) => (
      <p className="mealCalorie" key={index}>
        {value}
      </p>
    ))}
    <NeededCalorie onCalorie={remainingCal} />
    <h2>Dishes With Known Caloric Value</h2>
    <CreateMeal onAdd={(newMeal) => handleAddIngredient(null, newMeal)} />
    <h2>Dishes Made With Multiple Ingredients</h2>
    <CreateIngredient
      onAdd={(newIngredient) => handleAddIngredient(newIngredient, null)}
    />
    <table>
      <tbody>
        {meal.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <p className="dishTitle">{row[0].title}</p>
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
