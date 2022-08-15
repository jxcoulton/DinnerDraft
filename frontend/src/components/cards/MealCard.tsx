import { useContext } from "react";
import { UserDataContext } from "../../context/userData";
import EditMealButton from "../buttons/EditMealButton";
import DeleteMealButton from "../buttons/DeleteMealButton";
import FavoriteMealButton from "../buttons/FavoriteMealButton";
import IMealState from "../../interface/IMealState";
import { Box, Typography, useTheme } from "@mui/material";
import { format } from "date-fns";

type Props = {
  mealType: string;
};

const MealCard = ({ mealType }: Props) => {
  const { databaseData, startDate, setModalOpen, setCurrentRecipe } =
    useContext(UserDataContext);
  const theme = useTheme();

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
          <Box
            key={eachRecipe.id}
            borderTop={`1px solid ${theme.palette.grey[200]}`}
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <FavoriteMealButton recipe={eachRecipe} />
            <Typography
              variant="h6"
              paddingX={2}
              paddingY={2}
              onClick={() => handleOpenModal(eachRecipe)}
              sx={{ flexGrow: 1 }}
            >
              {eachRecipe.title}
            </Typography>
            <EditMealButton recipe={eachRecipe} />
            <DeleteMealButton recipe={eachRecipe} mealType={mealType} />
          </Box>
        ))}
    </div>
  );
};

export default MealCard;
