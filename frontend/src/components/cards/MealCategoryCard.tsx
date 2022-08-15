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
        margin="2rem auto 1rem"
        maxWidth="1250px"
        width="95%"
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
              paddingX={4}
              paddingY={2}
              textTransform={"uppercase"}
              color={theme.palette.grey[600]}
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
