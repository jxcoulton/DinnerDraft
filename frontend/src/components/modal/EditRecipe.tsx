import { useContext, useState } from "react";
import IMealState from "../../interface/IMealState";
import IRecipeState from "../../interface/IRecipeState";
import { UserDataContext } from "../../context/userData";
import { update, ref } from "firebase/database";
import { database } from "../../config/firebase";
import { TextField, Button, Link, useTheme } from "@mui/material";
import LoadingBar from "../common/LoadingBar";

const EditRecipe = () => {
  const {
    databaseData,
    activeUser,
    trigger,
    setTrigger,
    currentRecipe,
    setCurrentRecipe,
    setEdit,
    userFavorites,
    setLoadingBar,
    setShowAlert,
  } = useContext(UserDataContext);
  const theme = useTheme();

  const [editedRecipe, setEditedRecipe] = useState({
    title: currentRecipe.title,
    url: currentRecipe.url || "",
    ingredients: currentRecipe.ingredients
      ? currentRecipe.ingredients.map((item) => `${item} \n`).join("")
      : "",
    directions: currentRecipe.directions
      ? currentRecipe.directions.map((item) => `${item} \n`).join("")
      : "",
    favorite: currentRecipe.favorite,
    id: currentRecipe.id,
  });

  const style = {
    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
    fontWeight: 400,
    fontSize: "1rem",
    lineHeight: 1.5,
    letterSpacing: "0.00938em",
    color: theme.palette.grey[700],
  };

  const editedState = {
    directions: editedRecipe?.directions.trim().split("\n"),
    ingredients: editedRecipe?.ingredients.trim().split("\n"),
    title: editedRecipe?.title,
    favorite: editedRecipe?.favorite,
    id: editedRecipe?.id,
    url: editedRecipe?.url,
  };

  function convertArray(string: string) {
    return string
      .trim()
      .split("\n")
      .filter((i: string) => i);
  }

  function handleChangeRecipe(e: React.ChangeEvent<HTMLInputElement>) {
    const eTarget = e.target as HTMLInputElement;
    let key: string = eTarget.name;

    setEditedRecipe({
      ...editedRecipe,
      url: currentRecipe.url || "",
      [key]: eTarget.value,
    });
  }

  function handleSaveEditedMeal(e: React.SyntheticEvent) {
    e.preventDefault();
    setLoadingBar(true);

    for (var date in databaseData) {
      let dateItems = databaseData[date];
      for (var type in dateItems) {
        let meal = dateItems[type as keyof IMealState];
        for (var index in meal) {
          let item = meal[index as unknown as number];
          if (item?.id === currentRecipe.id) {
            update(
              ref(
                database,
                `users/${activeUser.uid}/meals/${date}/${type}/${index}`
              ),
              {
                ...editedRecipe,
                ingredients: [...convertArray(editedRecipe.ingredients)],
                directions: [...convertArray(editedRecipe.directions)],
              }
            )
              .then(() => {})
              .catch((error) => {
                setShowAlert({
                  show: true,
                  severity: "error",
                  message: `${error.message}`,
                });
              });
          }
        }
      }
    }

    for (var fav in userFavorites) {
      let items = userFavorites[fav as keyof IRecipeState] as IRecipeState;
      if (items?.id === editedRecipe.id) {
        update(
          ref(database, `users/${activeUser.uid}/favorites/${editedRecipe.id}`),
          {
            ...editedRecipe,
            ingredients: [...convertArray(editedRecipe.ingredients)],
            directions: [...convertArray(editedRecipe.directions)],
          }
        )
          .then(() => {})
          .catch((error) => {
            setShowAlert({
              show: true,
              severity: "error",
              message: `${error.message}`,
            });
          });
      }
    }
    setCurrentRecipe(editedState);
    setTrigger(!trigger);
    setEdit(false);
    setLoadingBar(false);
    setShowAlert({
      show: true,
      severity: "success",
      message: `Recipe Updated`,
    });
  }

  return (
    <form onSubmit={handleSaveEditedMeal}>
      <LoadingBar />
      <TextField
        label="Edit Recipe Name"
        onChange={handleChangeRecipe}
        name="title"
        value={editedRecipe.title}
        fullWidth
        sx={{ marginBottom: "1rem" }}
        inputProps={{ style: style }}
      />

      {currentRecipe.url && (
        <Link href={`${currentRecipe.url}`} target="_blank" rel="noreferrer">
          {new URL(currentRecipe.url).hostname.replace("www.", "")}
        </Link>
      )}

      <TextField
        label="Edit Ingredients"
        onChange={handleChangeRecipe}
        name="ingredients"
        value={editedRecipe.ingredients}
        multiline
        fullWidth
        sx={{
          marginY: "1rem",
        }}
        inputProps={{
          style: style,
        }}
      />

      <TextField
        label="Edit Directions"
        onChange={handleChangeRecipe}
        name="directions"
        value={editedRecipe.directions}
        multiline
        fullWidth
        inputProps={{
          style: style,
        }}
      />
      <Button
        variant="contained"
        type="submit"
        sx={{ margin: "1rem 1rem 0 0" }}
      >
        save changes
      </Button>
      <Button
        variant="contained"
        color="inherit"
        onClick={() => setEdit(false)}
        sx={{ margin: "1rem 1rem 0 0" }}
      >
        cancel changes
      </Button>
    </form>
  );
};

export default EditRecipe;
