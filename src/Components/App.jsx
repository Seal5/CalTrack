import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Ingredient from "./Ingredient";
import CreateIngredient from "./CreateIngredient";

function App() {
  // set up states for ingredient and meal
  const [ingredient, setIngredient] = useState([{
      title: "",
      ingreTitle: "",
      caloriePG: "",
      weightG: ""
    }]);
  const [meal, setMeal] = useState(
    [[{
      title: "",
      ingreTitle: "",
      caloriePG: "",
      weightG: ""
    }]]
  );

  // creating meal array with ingredients for each dish using objects
  function mealList() {
    setMeal((prevMeal) => {
      for (let i = 0; i < ingredient.length; i++) {
        for (let j = 0; j < meal.length; j++) {
          if (meal[i][0].title === ingredient[j].title) {
            return{
              prevMeal[i][j].title : ingredient[j].title,
              prevMeal[i][j].ingreTitle : ingredient[j].ingreTitle,
              prevMeal[i][j].caloriePG : ingredient[j].caloriePG,
              prevMeal[i][j].weightG : ingredient[j].weightG}
            }
          }
        }
    }})
  }

    // function sendMeal(meal){
    //   props.onNew(meal);
    // }

    // adding ingredient and adding meal if new one is added
    function addIngredient(newIngredient) {
      setIngredient((prevIngredients) => {
        return [...prevIngredients, newIngredient];
      });
      const checkNew = newIngredient.title;
      setMeal((prevMeal) => {
        let count = 0;
        for (let i = 0; i < prevMeal.length; i += 1) {
          if (prevMeal[i] !== checkNew) {
            count = count + 1;
          }
        }
        if (count === prevMeal.length) {
          return [...prevMeal, checkNew];
        } else {
          return [...prevMeal];
        }
      });
    }

    // deleting ingredient off
    function deleteIngredient(id) {
      setIngredient((prevIngredients) => {
        return prevIngredients.filter((ingredient, index) => {
          return index !== id;
        });
      });
    }

    // extracting the entire webpage
    return (
      <div>
        <Header />
        <CreateIngredient onAdd={addIngredient} />
        {ingredient.map((ingredient, index) => {
          return (
            <Ingredient
              key={index}
              id={index}
              title={ingredient.title}
              ingredienttitle={ingredient.ingredientTitle}
              weightG={ingredient.weightG}
              caloriePG={ingredient.caloriePG}
              onDelete={deleteIngredient}
            />
          );
        })}
        <Footer />
      </div>
    );
  }


export default App;
