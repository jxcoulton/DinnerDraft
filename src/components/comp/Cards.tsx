import React, { useState, useEffect } from "react";
import { format, subDays, addDays } from "date-fns";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import MainState from "../interface/MainState";
import MealState from "../interface/MealState";
import { ref, set, get, child, push, update } from "firebase/database";
import { database } from "../../config/firebase";
import { Button, TextField, Typography } from "@mui/material";
import Center from "../utils/Center";

const defaultMainState = {
  uid: null,
  email: null,
  displayName: null,
};

const defaultMeal = {
  breakfast: [],
  lunch: [],
  dinner: [],
  snack: [],
};

const Card: React.FC = () => {
  const today = new Date();
  let dailyCard: JSX.Element;
  const [activeUser, setActiveUser] = useState<MainState>(defaultMainState);
  const [startDate, setStartDate] = useState(today);
  const [dateMeal, setDateMeal] = useState<MealState>(defaultMeal);

  useEffect(() => {
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

    return () => {
      unsubscribeAuthChange();
    };
  }, []);

  const handlePrevDate = () => {
    startDate > subDays(today, 13) && setStartDate(subDays(startDate, 1));
  };

  const handleNextDate = () => {
    startDate < addDays(today, 12) && setStartDate(addDays(startDate, 1));
  };

  const handleToday = () => {
    setStartDate(today);
  };

  const handleSetMeal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const eventTarget = e.target as HTMLInputElement;
    //filter out "" to avoid overriding data
    //creat an option to add multiple foods per meal with array
    setDateMeal({
      ...dateMeal,
      [eventTarget.name]: [eventTarget.value],
    });
  };

  const handleUpdateMealDB = () => {
    update(
      ref(
        database,
        "users/" + activeUser.uid + "/meals/" + format(startDate, "PPP")
      ),
      {
        ...dateMeal,
      }
    )
      .then(() => {
        console.log("data sent");
      })
      .catch((error) => {
        console.log("error");
      });
  };

  console.log(dateMeal);

  dailyCard = (
    <Center height={"auto"}>
      <h1>
        {format(startDate, "eeee")} - {format(startDate, "PPP")}
      </h1>
      <form onChange={handleSetMeal}>
        <Typography variant="h5">Breakfast</Typography>
        <TextField name="breakfast" />
        {/* <button>add another item</button> */}
        <Typography variant="h5">Lunch</Typography>
        <TextField name="lunch" />
        {/* <button>add another item</button> */}
        <Typography variant="h5">Dinner</Typography>
        <TextField name="dinner" />
        {/* <button>add another item</button> */}
        <Typography variant="h5">Snack</Typography>
        <TextField name="snack" />
        {/* <button>add another item</button> */}
        <Button size="large" variant="contained" onClick={handleUpdateMealDB}>
          create daily plan
        </Button>
      </form>
    </Center>
  );

  return (
    <div>
      <button onClick={handlePrevDate}>prev day</button>
      <button onClick={handleToday}>today</button>
      {dailyCard}
      <button onClick={handleNextDate}>next day</button>
    </div>
  );
};

export default Card;
