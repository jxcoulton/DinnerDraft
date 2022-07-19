import { useContext } from "react";
import EditMealButton from "../buttons/EditMealButton";
import MealState from "../../interface/MealState";
import { UserDataContext } from "../../context/userData";
import { Card, Typography } from "@mui/material";
import uuid from "react-uuid";
import DeleteMealButton from "../buttons/DeleteMealButton";
import FavoriteMealButton from "../buttons/FavoriteMealButton";

type Props = {
  mealType: string;
};

const MealCard = ({ mealType }: Props) => {
  const { databaseData } = useContext(UserDataContext);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {databaseData[mealType as keyof MealState]?.map((eachRecipe: any) => (
        <Card
          key={uuid()}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            borderRadius: "0px",
            alignItems: "center",
          }}
        >
          <FavoriteMealButton recipe={eachRecipe} mealType={mealType} />
          <Typography variant="h6" paddingX={"10%"} paddingY={"2%"}>
            {eachRecipe.title}
          </Typography>
          <EditMealButton recipe={eachRecipe} mealType={mealType} />
          <DeleteMealButton title={eachRecipe.title} mealType={mealType} />
        </Card>
      ))}
    </div>
  );
};

export default MealCard;
