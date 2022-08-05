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

  function handleOpenModal(eachRecipe: any) {
    setModalOpen(true);
    setCurrentRecipe(eachRecipe);
  }

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
            <FavoriteMealButton recipe={eachRecipe} />
            <Typography
              variant="h6"
              paddingX={"10%"}
              paddingY={"2%"}
              onClick={() => handleOpenModal(eachRecipe)}
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
