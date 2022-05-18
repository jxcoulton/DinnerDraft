import React, { useState, useEffect } from "react";
import { Button, TextField, Typography, Card } from "@mui/material";
import Center from "../utils/Center";
import OpenState from "../interface/OpenState";
import MealState from "../interface/MealState";
import InputValueState from "../interface/InputValueState";
import { ref, get, child, update } from "firebase/database";
import { database } from "../../config/firebase";
import { format } from "date-fns";
import MealItems from "./MealItems";

type Props = {
  startDate: Date;
  activeUser: {
    uid?: string | null;
    email?: string | null;
    displayName?: string | null;
  };
};

const defaultOpenState = {
  breakfast: false,
  lunch: false,
  dinner: false,
  snack: false,
};

const defaultMeal = {};

const defaultValue = {
  breakfast: "",
  lunch: "",
  dinner: "",
  snack: "",
};

const meals = ["breakfast", "lunch", "dinner", "snack"];

const MealType = ({ startDate, activeUser }: Props) => {
  const dbRef = ref(database);
  const [open, setOpen] = useState<OpenState>(defaultOpenState);
  const [value, setValue] = useState<InputValueState>(defaultValue);
  const [dateMeal, setDateMeal] = useState<MealState>(defaultMeal);
  const [databaseData, setDatabaseData] = useState<MealState>(defaultMeal);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await get(
        child(
          dbRef,
          `users/${activeUser.uid}/meals/${format(startDate, "PPP")}`
        )
      )
        .then((snapshot) => {
          if (snapshot.exists()) {
            setDatabaseData(snapshot.val());
            setDateMeal(snapshot.val()); //sets the start of the meal to the existing meal
          } else {
            setDatabaseData(defaultMeal);
            setDateMeal(defaultMeal);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getData();
  }, [activeUser.uid, dbRef, startDate, trigger]);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSetMeal = (e: React.FormEvent) => {
    e.preventDefault();
    const eTarget = e.target as HTMLInputElement;
    let name = eTarget.name as string;

    if (
      !!value[name as keyof InputValueState] &&
      value[name as keyof InputValueState] !== ""
    ) {
      setDateMeal({
        ...dateMeal,
        [eTarget.name]: !dateMeal[eTarget.name]
          ? [value[name as keyof InputValueState] as string]
          : [
              ...dateMeal[eTarget.name],
              value[name as keyof InputValueState] as string,
            ],
      });
      setDateMeal((state) => {
        update(
          ref(
            database,
            `users/${activeUser.uid}/meals/${format(startDate, "PPP")}`
          ),
          {
            ...state,
          }
        )
          .then(() => {})
          .catch((error) => {
            console.log("error");
          });
        return state;
      });
    }
    setValue(defaultValue);
    setTrigger(!trigger);
    setOpen(defaultOpenState);
  };

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    const eTarget = e.target as HTMLInputElement;

    setOpen({
      [eTarget.name]: true,
    });
  };

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(defaultOpenState);
  };

  let dailyCard = meals.map((item, index) => (
    <div key={index}>
      <Typography variant="h5">{item}</Typography>
      {!open[item as keyof typeof value] && (
        <Button name={item} onClick={handleOpen}>
          Add
        </Button>
      )}
      {!!open[item as keyof typeof value] && (
        <Card>
          <form name={item} onSubmit={handleSetMeal}>
            <TextField
              autoFocus
              name={item}
              value={value[item as keyof typeof value]}
              onChange={handleChangeValue}
            />
            <Button onClick={handleClose}>X</Button>
            <Button type="submit" size="large" variant="contained">
              add
            </Button>
          </form>
        </Card>
      )}
      <MealItems item={item} databaseData={databaseData} activeUser={activeUser} startDate={startDate} setTrigger={setTrigger} trigger={trigger}/>
    </div>
  ));

  //meal items displayed in each card
  return (
    <Center height={"auto"}>
      <h1>{format(startDate, "eeee")}</h1>
      <h2>{format(startDate, "PPP")}</h2>
      {dailyCard}
    </Center>
  );
};

export default MealType;
