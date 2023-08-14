import Header from "../mainComp/Header";
import Footer from "../mainComp/Footer";
import Ingredient from "../mainComp/Ingredient";
import CreateIngredient from "../mainComp/CreateIngredient";
import CreateMeal from "../mainComp/CreateMeal";
import NeededCalorie from "../mainComp/NeededCalorie";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Home = () => {
  // set up states for ingredient and meal
  const [cookies, _] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const [output, setOutput] = useState([]);
  const [remaining, setRemaining] = useState();
  const [total, setTotal] = useState(2250);
  const [meal, setMeal] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const userID = useGetUserID();

  // Update the time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 10); // Gives you 'YYYY-MM-DD'
      setCurrentDate(formattedDate);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // use effect to load proper values
  useEffect(() => {
    setCalcValue();
    remainingCal(total)
    // addToList();
  }, [meal]);

  useEffect(() => {
    remainingCal(total);
  }, [total]);

  useEffect(() => {}, [remaining]);

  // handling all times when meal is added
  function handleAddIngredient(newIngredient, newMeal) {
    if (newIngredient !== null) {
      addIngredient(newIngredient);
    } else if (newMeal !== null) {
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

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    try {
      await axios.post(
        "http://localhost:3001/stat",
        { 
          total: total,
          remaining: remaining,
          currentDate: currentDate,
          // meal: meal,
          userOwner: userID
        },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Stat Updated");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  // extracting the entire webpage
  return (
    <div className="output">
      <Header />
      <h2>Calories For {currentDate}</h2>
      {remaining < 0 ? (
        <p className="remaining">Calorie Lost Needed: {-remaining}</p>
      ) : (
        <p className="remaining">Calorie Remaing: {remaining}</p>
      )}
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
      <button onClick={handleSubmit}> Update </button>
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
};
