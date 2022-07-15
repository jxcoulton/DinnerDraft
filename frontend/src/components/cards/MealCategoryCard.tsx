import { useEffect, useContext } from "react";
import { UserDataContext } from "../../context/userData";
import Center from "../../utils/Center";
import MealCard from "./MealCard";
import { ref, get, child } from "firebase/database";
import { database } from "../../config/firebase";
import { format } from "date-fns";
import { Typography } from "@mui/material";
import uuid from "react-uuid";
import AddMealCardButton from "../buttons/AddMealCardButton";
import CreateMealCard from "./CreateMealCard";

const defaultOpenState = {
  breakfast: false,
  lunch: false,
  dinner: false,
  snack: false,
};

const MealCategoryCard = () => {
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

  //move cancel add meal from open card to replace +
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
              <AddMealCardButton mealType={mealType} />
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
              <CreateMealCard mealType={mealType} />
            )}
          </div>
          <div style={{ width: "100%" }}>
            <MealCard mealType={mealType} />
          </div>
        </div>
      ))}
    </Center>
  );
};

export default MealCategoryCard;
