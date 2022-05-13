import React, { useState, useEffect } from "react";
import { format, subDays, addDays } from "date-fns";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import MainState from "../interface/MainState";
import MealState from "../interface/MealState";
import InputValueState from "../interface/InputValueState";
import { ref, get, child, update } from "firebase/database";
import { database } from "../../config/firebase";
import { Button, TextField, Typography } from "@mui/material";
import Center from "../utils/Center";

const defaultMainState = {
  uid: null,
  email: null,
  displayName: null,
};

const defaultMeal = {};

const defaultValue = {
  breakfast: "",
  lunch: "",
  dinner: "",
  snack: "",
};

const Card: React.FC = () => {
  const today = new Date();
  const dbRef = ref(database);
  let dailyCard: JSX.Element;
  const [activeUser, setActiveUser] = useState<MainState>(defaultMainState);
  const [startDate, setStartDate] = useState(today);
  const [dateMeal, setDateMeal] = useState<MealState>(defaultMeal);
  const [value, setValue] = useState<InputValueState>(defaultValue);
  const [dBData, setDBData] = useState<MealState>(defaultMeal);
  const [getDataOnChange, setGetDataOnChange] = useState(false);

  useEffect(() => {
    console.log("ran");
    const unsubscribeAuthChange = onAuthStateChanged(auth, () => {
      if (auth.currentUser) {
        setActiveUser({
          uid: auth.currentUser.uid,
          email: auth.currentUser.email,
          displayName: auth.currentUser.displayName,
        });
      } else {
        setActiveUser(defaultMainState);
      }
    });

    const getData = async () => {
      await get(
        child(
          dbRef,
          `users/${activeUser.uid}/meals/${format(startDate, "PPP")}`
        )
      )
        .then((snapshot) => {
          if (snapshot.exists()) {
            setDBData(snapshot.val());
          } else {
            setDBData(defaultMeal);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getData();

    return () => {
      unsubscribeAuthChange();
    };
  }, [activeUser.uid, dbRef, startDate, getDataOnChange]);

  const handlePrevDate = () => {
    startDate > subDays(today, 13) && setStartDate(subDays(startDate, 1));
  };

  const handleNextDate = () => {
    startDate < addDays(today, 12) && setStartDate(addDays(startDate, 1));
  };

  const handleToday = () => {
    setStartDate(today);
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSetMeal = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const eventTarget = e.target as HTMLInputElement;

    if (e.key === "Enter" && eventTarget.value !== "") {
      setDateMeal({
        ...dateMeal,
        [eventTarget.name]: !dateMeal[eventTarget.name]
          ? [eventTarget.value]
          : [...dateMeal[eventTarget.name], eventTarget.value],
      });
      setValue(defaultValue);
    }
  };

  console.log(dBData, dateMeal); // merge existing data and new data on update

  const handleUpdateMealDB = () => {
    update(
      ref(
        database,
        `users/${activeUser.uid}/meals/${format(startDate, "PPP")}`
      ),
      {
        ...dBData,
        ...dateMeal,
      }
    )
      .then(() => {
        console.log("data sent");
        setDateMeal(defaultMeal);
      })
      .catch((error) => {
        console.log("error");
      });
    setGetDataOnChange(!getDataOnChange);
  };

  dailyCard = (
    <Center height={"auto"}>
      <h1>{format(startDate, "eeee")}</h1>
      <h2>{format(startDate, "PPP")}</h2>
      <form>
        <Typography variant="h5">Breakfast</Typography>
        <TextField
          name="breakfast"
          onKeyUp={handleSetMeal}
          value={value.breakfast}
          onChange={handleChangeValue}
        />
        {!!dateMeal.breakfast &&
          dateMeal.breakfast.map((item, i) => <p key={i}>{item}</p>)}
        <Typography variant="h5">Lunch</Typography>
        <TextField
          name="lunch"
          onKeyUp={handleSetMeal}
          value={value.lunch}
          onChange={handleChangeValue}
        />
        <Typography variant="h5">Dinner</Typography>
        <TextField
          name="dinner"
          onKeyUp={handleSetMeal}
          value={value.dinner}
          onChange={handleChangeValue}
        />
        <Typography variant="h5">Snack</Typography>
        <TextField
          name="snack"
          onKeyUp={handleSetMeal}
          value={value.snack}
          onChange={handleChangeValue}
        />
        <Button size="large" variant="contained" onClick={handleUpdateMealDB}>
          add all
        </Button>
      </form>
    </Center>
  );

  return (
    <div>
      <button onClick={handlePrevDate}>prev day</button>
      <button onClick={handleToday}>today</button>
      {!!dBData.breakfast &&
        dBData.breakfast.map((item, i) => <p key={i}>{item}</p>)}
      {!!dBData.lunch && dBData.lunch.map((item, i) => <p key={i}>{item}</p>)}
      {!!dBData.dinner && dBData.dinner.map((item, i) => <p key={i}>{item}</p>)}
      {!!dBData.snack && dBData.snack.map((item, i) => <p key={i}>{item}</p>)}
      {dailyCard}
      <button onClick={handleNextDate}>next day</button>
    </div>
  );
};

export default Card;
