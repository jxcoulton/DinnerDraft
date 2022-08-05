import { useContext } from "react";
import { UserDataContext } from "../../context/userData";
import EditMealButton from "../buttons/EditMealButton";
import DeleteMealButton from "../buttons/DeleteMealButton";
import FavoriteMealButton from "../buttons/FavoriteMealButton";
import IMealState from "../../interface/IMealState";
import { Card, Typography } from "@mui/material";
import { format } from "date-fns";

type Props = {
  mealType: string;
};

const MealCard = ({ mealType }: Props) => {
  const { databaseData, startDate, setModalOpen, setCurrentRecipe } =
    useContext(UserDataContext);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {databaseData[`${format(startDate, "PPP")}`] &&
        databaseData[`${format(startDate, "PPP")}`][
          mealType as keyof IMealState
        ]?.map((eachRecipe: any) => (
          <Card
            key={eachRecipe.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              borderRadius: "0px",
              alignItems: "center",
            }}
          >
            <FavoriteMealButton recipe={eachRecipe} mealType={mealType} />
            <Typography
              variant="h6"
              paddingX={"10%"}
              paddingY={"2%"}
              onClick={() => {
                setModalOpen(true);
                setCurrentRecipe(eachRecipe);
              }}
            >
              {eachRecipe.title}
            </Typography>
            <EditMealButton recipe={eachRecipe} />
            <DeleteMealButton recipe={eachRecipe} mealType={mealType} />
          </Card>
        ))}
    </div>
  );
};

export default MealCard;
