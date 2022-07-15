import { useEffect, useContext } from "react";
import { UserDataContext } from "../context/userData";
import Center from "../utils/Center";
import MealItems from "./MealItems";
import { ref, get, child } from "firebase/database";
import { database } from "../../config/firebase";
import { format } from "date-fns";
import { Typography } from "@mui/material";
import uuid from "react-uuid";
import AddNewItemButton from "./AddNewItemButton";
import AddNewMeal from "./AddNewMeal";

const defaultOpenState = {
  breakfast: false,
  lunch: false,
  dinner: false,
  snack: false,
};

const MealType = () => {
  const dbRef = ref(database);

  const {
    activeUser,
    startDate,
    setDatabaseData,
    value,
    trigger,
    addMealItemOpen,
    setAddMealItemOpen,
    setDateMeal,
  } = useContext(UserDataContext);

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
            setDatabaseData({});
            setDateMeal({});
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    setAddMealItemOpen(defaultOpenState);
    getData();
  }, [
    activeUser.uid,
    dbRef,
    startDate,
    trigger,
    setDatabaseData,
    setAddMealItemOpen,
    setDateMeal,
  ]);

  return (
    <Center height={"auto"}>
      <Typography key={uuid()} variant="h3">{`${format(
        startDate,
        "eee, LLL d"
      )}`}</Typography>
      {["Breakfast", "Lunch", "Dinner", "Snack"].map((mealType) => (
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
              {mealType}
            </Typography>
            {!addMealItemOpen[mealType as keyof typeof value] && (
              <AddNewItemButton mealType={mealType} />
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {addMealItemOpen[mealType as keyof typeof value] && (
              <AddNewMeal mealType={mealType} />
            )}
          </div>
          <div style={{ width: "100%" }}>
            <MealItems mealType={mealType} />
          </div>
        </div>
      ))}
    </Center>
  );
};

export default MealType;
