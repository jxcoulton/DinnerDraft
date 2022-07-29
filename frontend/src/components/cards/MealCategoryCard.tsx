import { useContext } from "react";
import { UserDataContext } from "../../context/userData";
import AddMealCardButton from "../buttons/AddMealCardButton";
import CreateMealCard from "./CreateMealCard";
import MealCard from "./MealCard";
import { format } from "date-fns";
import { Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MealCategoryCard = () => {
  const { startDate, value, addMealItemOpen, setAddMealItemOpen } =
    useContext(UserDataContext);

  return (
    <>
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
              <IconButton
                onClick={() =>
                  setAddMealItemOpen({
                    breakfast: false,
                    lunch: false,
                    dinner: false,
                    snack: false,
                  })
                }
              >
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
    </>
  );
};

export default MealCategoryCard;
