import { useContext, useState } from "react";
import IMealState from "../../interface/IMealState";
import IRecipeState from "../../interface/IRecipeState";
import { UserDataContext } from "../../context/userData";
import { PublicVariablesContext } from "../../context/PublicVariables";
import { update, ref } from "firebase/database";
import { database } from "../../config/firebase";
import { TextField } from "@mui/material";
import LoadingBar from "../common/LoadingBar";

const EditRecipe = () => {
  const {
    databaseData,
    activeUser,
    trigger,
    setTrigger,
    currentRecipe,
    setEdit,
    userFavorites,
  } = useContext(UserDataContext);
  const { setLoadingBar, setShowAlert } = useContext(PublicVariablesContext);

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
    setTrigger(!trigger);
    setEdit(false);
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
        value={editedRecipe.title}
        fullWidth
        name="title"
        onChange={handleChangeRecipe}
      />

      {currentRecipe.url && (
        <a href={`${currentRecipe.url}`} target="_blank" rel="noreferrer">
          {new URL(currentRecipe.url).hostname.replace("www.", "")}
        </a>
      )}

      <TextField
        label="Edit Ingredients"
        multiline
        value={editedRecipe.ingredients}
        fullWidth
        name="ingredients"
        onChange={handleChangeRecipe}
      />

      <TextField
        label="Edit Directions"
        multiline
        value={editedRecipe.directions}
        fullWidth
        name="directions"
        onChange={handleChangeRecipe}
      />
      <button type="submit">save changes</button>
    </form>
  );
};

export default EditRecipe;
