import { useEffect, useContext } from "react";
import { UserDataContext } from "../../context/userData";
import AddMealCardButton from "../buttons/AddMealCardButton";
import CreateMealCard from "./CreateMealCard";
import Center from "../../utils/Center";
import MealCard from "./MealCard";
import { ref, get, child } from "firebase/database";
import { database } from "../../config/firebase";
import { format } from "date-fns";
import { Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
  } = useContext(UserDataContext);

  useEffect(() => {
    const getData = async () => {
      await get(child(dbRef, `users/${activeUser.uid}/meals/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setDatabaseData(snapshot.val());
          } else {
            setDatabaseData({});
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
  ]);

  return (
    <Center height={"auto"}>
      <Typography key={startDate.getDate()} variant="h3">{`${format(
        startDate,
        "eee, LLL d"
      )}`}</Typography>
      {["breakfast", "lunch", "dinner", "snack"].map((mealType) => (
        <div key={mealType} style={{ width: "100%" }}>
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
            {!addMealItemOpen[mealType as keyof typeof value] ? (
              <AddMealCardButton mealType={mealType} />
            ) : (
              <IconButton onClick={() => setAddMealItemOpen(defaultOpenState)}>
                <CloseIcon />
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
