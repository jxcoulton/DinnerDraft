import { useContext } from "react";
import Banner from "../common/Banner";
import FavoriteMealButton from "../buttons/FavoriteMealButton";
import EditMealButton from "../buttons/EditMealButton";
import CreateMealCard from "../cards/CreateMealCard";
import { UserDataContext } from "../../context/userData";
import { Box, Card, Typography, useTheme } from "@mui/material";

const FavoritesPage = () => {
  const { userFavorites, setModalOpen, setCurrentRecipe } =
    useContext(UserDataContext);

  const theme = useTheme();

  let favorites = Object.values(userFavorites);

  function handleOpenModal(eachRecipe: any) {
    setModalOpen(true);
    setCurrentRecipe(eachRecipe);
  }

  return (
    <>
      <Banner />
      <Card
        sx={{
          backgroundColor: theme.palette.background.default,
          width: "90%",
          maxWidth: "1200px",
          margin: "1rem auto",
          padding: "1.5rem",
        }}
      >
        <CreateMealCard />
        {favorites?.map((eachRecipe: any) => {
          return (
            <Box
              key={eachRecipe.id}
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                borderTop: `1px solid ${theme.palette.grey[200]}`,
                cursor: "pointer",
              }}
            >
              <FavoriteMealButton recipe={eachRecipe} />
              <Typography
                variant="h6"
                onClick={() => handleOpenModal(eachRecipe)}
                flexGrow={1}
                sx={{ padding: "20px" }}
              >
                {eachRecipe.title}
              </Typography>
              <EditMealButton recipe={eachRecipe} />
            </Box>
          );
        })}
      </Card>
    </>
  );
};

export default FavoritesPage;
