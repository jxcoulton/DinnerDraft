import { useContext } from "react";
import { UserDataContext } from "../../context/userData";
import FavoriteMealButton from "../buttons/FavoriteMealButton";
import EditMealButton from "../buttons/EditMealButton";
import CreateMealCard from "../cards/CreateMealCard";
import { Card, Typography } from "@mui/material";

function Favorites() {
  const { userFavorites } = useContext(UserDataContext);

  let favorites = Object.values(userFavorites);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CreateMealCard />
      {favorites?.map((eachRecipe: any) => {
        return (
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
            <Typography variant="h6" sx={{ padding: "20px" }}>
              {eachRecipe.title}
            </Typography>
            <EditMealButton recipe={eachRecipe} />
          </Card>
        );
      })}
    </div>
  );
}

export default Favorites;
