import { UserDataContext } from "../../context/userData";
import { Card, Typography } from "@mui/material";
import { useContext } from "react";
import uuid from "react-uuid";
import FavoriteMealButton from "../buttons/FavoriteMealButton";
import EditMealButton from "../buttons/EditMealButton";
import AddMealCardButton from "../buttons/AddMealCardButton";
import CreateMealCard from "../cards/CreateMealCard";

function Favorites() {
  const { allData } = useContext(UserDataContext);

  let favorites = Object.values(allData);

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
            key={uuid()}
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
