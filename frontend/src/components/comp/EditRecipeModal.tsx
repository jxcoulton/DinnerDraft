import { useContext, useState } from "react";
import MealState from "../interface/MealState";
import { UserDataContext } from "../context/userData";
import { update, ref } from "firebase/database";
import { database } from "../../config/firebase";
import { format } from "date-fns";
import { TextField } from "@mui/material";

type Props = {
  recipe: {
    [key: string]: any;
  };
  mealType: string;
};

const EditRecipeModal = ({ recipe, mealType }: Props) => {
  const { databaseData, activeUser, startDate, trigger, setTrigger } =
    useContext(UserDataContext);
  const [editedRecipe, setEditedRecipe] = useState({
    title: recipe.title,
    url: recipe.url || "",
    ingredients: recipe.ingredients
      ? recipe.ingredients.map((item: any) => `${item} \n`).join("")
      : "",
    directions: recipe.directions
      ? recipe.directions.map((item: any) => `${item} \n`).join("")
      : "",
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
      url: recipe.url || "",
      [key]: eTarget.value,
    });
  }

  function handleSaveEditedMeal(e: React.SyntheticEvent) {
    e.preventDefault();

    const valueIndex =
      databaseData[mealType as keyof MealState]?.findIndex(
        (s: any) => s.title === recipe.title
      ) || 0;

    setEditedRecipe(() => {
      update(
        ref(
          database,
          `users/${activeUser.uid}/meals/${format(
            startDate,
            "PPP"
          )}/${mealType}/${valueIndex}`
        ),
        {
          ...editedRecipe,
          ingredients: [...convertArray(editedRecipe.ingredients)],
          directions: [...convertArray(editedRecipe.directions)],
        }
      )
        .then(() => {
          setTrigger(!trigger); //updating modal set to loading??
        })
        .catch((error) => {
          console.log(error);
        });
      return editedRecipe;
    });
    //get recipe from database to display
  }

  return (
    <form onSubmit={handleSaveEditedMeal}>
      <TextField
        label="Edit Recipe Name"
        value={editedRecipe.title}
        fullWidth
        name="title"
        onChange={handleChangeRecipe}
      />

      {recipe.url && (
        <a href={recipe.url} target="_blank" rel="noreferrer">
          {new URL(recipe.url).hostname.replace("www.", "")}
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

export default EditRecipeModal;
