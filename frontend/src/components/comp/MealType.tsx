import React, { useState, useEffect } from "react";
import { Typography, Card, InputBase, IconButton } from "@mui/material";
import Center from "../utils/Center";
import OpenState from "../interface/OpenState";
import MealState from "../interface/MealState";
import InputValueState from "../interface/InputValueState";
import { ref, get, child, update } from "firebase/database";
import { database } from "../../config/firebase";
import { format } from "date-fns";
import MealItems from "./MealItems";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import uuid from "react-uuid";
import axios from "axios";

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

const defaultMeal: MealState = {};

const defaultValue = {
  breakfast: "",
  lunch: "",
  dinner: "",
  snack: "",
};

const meals = ["Breakfast", "Lunch", "Dinner", "Snack"];

const MealType = ({ startDate, activeUser }: Props) => {
  const dbRef = ref(database);
  const [open, setOpen] = useState<OpenState>(defaultOpenState);
  const [value, setValue] = useState<InputValueState>(defaultValue);
  const [dateMeal, setDateMeal] = useState<MealState>(defaultMeal);
  const [databaseData, setDatabaseData] = useState<MealState>(defaultMeal);
  const [trigger, setTrigger] = useState(false);
  const backend = "https://dinner-draft-backend.vercel.app/recipe";
  const localhost = "http://localhost:8080/recipe";

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
    setOpen(defaultOpenState);
    getData();
  }, [activeUser.uid, dbRef, startDate, trigger]);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSetMeal = async (e: React.FormEvent) => {
    e.preventDefault();
    const eTarget = e.target as HTMLInputElement;
    let name = eTarget.name;

    if (value[name as keyof InputValueState]?.includes("http")) {
      await axios
        .post(backend, {
          url: value[name as keyof InputValueState],
        })
        .then((res) => {
          const data = res.data.recipe;
          setDateMeal({
            ...dateMeal,
            [name]: !dateMeal[name as keyof MealState]
              ? [data]
              : [...(dateMeal[name as keyof MealState] as Array<any>), data],
          });
        })
        .catch((err) => console.log(err)); //set up toast
    } else if (value[name as keyof InputValueState]) {
      setDateMeal({
        ...dateMeal,
        [name]: !dateMeal[name as keyof MealState]
          ? [{ title: value[name as keyof InputValueState] }]
          : [
              ...(dateMeal[name as keyof MealState] as Array<any>),
              { title: value[name as keyof InputValueState] },
            ],
      });
    }
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
          console.log(error);
        });
      return state;
    });

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

  return (
    <Center height={"auto"}>
      <Typography key={uuid()} variant='h3'>{`${format(startDate, "eee, LLL d")}`}</Typography>
      {meals.map((item) => (
        <div key={uuid()} style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              borderBottom: "solid 1px darkgrey",
            }}
          >
            <Typography variant="h5" paddingX={"5%"} paddingY={"3%"}>
              {item}
            </Typography>
            {!open[item as keyof typeof value] && (
              <IconButton name={item} onClick={handleOpen}>
                <AddCircleIcon sx={{ pointerEvents: "none" }} />
              </IconButton>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {open[item as keyof typeof value] && (
              <Card
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  borderRadius: "0px",
                  backgroundColor: "#e9e6e6",
                  border: "solid 1px dark grey",
                }}
              >
                <form
                  name={item}
                  onSubmit={handleSetMeal}
                  style={{ width: "100%", padding: "2% 0", paddingLeft: "10%" }}
                >
                  <InputBase
                    autoFocus
                    name={item}
                    value={value[item as keyof typeof value]}
                    onChange={handleChangeValue}
                    placeholder={`Add custom ${item} item or recipe URL`}
                    sx={{ width: "80%" }}
                  />
                  <IconButton type="submit" color="primary">
                    <AddIcon />
                  </IconButton>
                </form>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Card>
            )}
          </div>
          <div style={{ width: "100%" }}>
            <MealItems
              item={item}
              databaseData={databaseData}
              activeUser={activeUser}
              startDate={startDate}
              setTrigger={setTrigger}
              trigger={trigger}
              value={value}
            />
          </div>
        </div>
      ))}
    </Center>
  );
};

export default MealType;
