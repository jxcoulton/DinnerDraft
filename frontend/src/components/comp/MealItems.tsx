import { useContext } from "react";
import EditMealRecipe from "./EditMealRecipe";
import MealState from "../interface/MealState";
import { UserDataContext } from "../context/userData";
import { Card, Typography } from "@mui/material";
import uuid from "react-uuid";
import RemoveItemButton from "./RemoveItemButton";
import AddFavorite from "./AddFavorite";

type Props = {
  mealType: string;
};

const MealItems = ({ mealType }: Props) => {
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
          <AddFavorite/>
          <Typography variant="h6" paddingX={"10%"} paddingY={"2%"}>
            {eachRecipe.title}
          </Typography>
          <EditMealRecipe recipe={eachRecipe} mealType={mealType} />
          <RemoveItemButton title={eachRecipe.title} mealType={mealType} />
        </Card>
      ))}
    </div>
  );
};

export default MealItems;
