import { useContext } from "react";
import { UserDataContext } from "../../context/userData";
import AddMealCardButton from "../buttons/AddMealCardButton";
import CreateMealCard from "./CreateMealCard";
import MealCard from "./MealCard";
import { format } from "date-fns";
import { Card, Typography, IconButton, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MealCategoryCard = () => {
  const { startDate, value, addMealItemOpen, setAddMealItemOpen } =
    useContext(UserDataContext);
  const theme = useTheme();

  return (
    <>
      <Typography
        key={startDate.getDate()}
        variant="h4"
        sx={{ width: "95%", maxWidth: "1250px", margin: "2rem auto 1rem" }}
      >{`${format(startDate, "eee, LLL d")}`}</Typography>
      {["breakfast", "lunch", "dinner", "snack"].map((mealType) => (
        <Card
          key={mealType}
          style={{
            width: "90%",
            maxWidth: "1200px",
            margin: "1rem auto",
            padding: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                padding: "1rem 2rem",
                color: theme.palette.grey[600],
                textTransform: "uppercase",
              }}
            >
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
                <CloseIcon fontSize={"large"} sx={{ pointerEvents: "none" }} />
              </IconButton>
            )}
          </div>

          {addMealItemOpen[mealType as keyof typeof value] && (
            <CreateMealCard mealType={mealType} />
          )}

          <MealCard mealType={mealType} />
        </Card>
      ))}
    </>
  );
};

export default MealCategoryCard;
