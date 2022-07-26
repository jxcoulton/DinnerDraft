import { useContext, useState } from "react";
import MealState from "../../interface/MealState";
import { UserDataContext } from "../../context/userData";
import { update, ref } from "firebase/database";
import { database } from "../../config/firebase";
import { format } from "date-fns";
import { TextField } from "@mui/material";

type Props = {
  mealType?: string;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditRecipe = ({ mealType, setEdit }: Props) => {
  const {
    databaseData,
    activeUser,
    startDate,
    trigger,
    setTrigger,
    currentRecipe,
    setModalOpen,
  } = useContext(UserDataContext);
  const [editedRecipe, setEditedRecipe] = useState({
    title: currentRecipe.title,
    url: currentRecipe.url || "",
    ingredients: currentRecipe.ingredients
      ? currentRecipe.ingredients.map((item) => `${item} \n`).join("")
      : "",
    directions: currentRecipe.directions
      ? currentRecipe.directions.map((item) => `${item} \n`).join("")
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
      url: currentRecipe.url || "",
      [key]: eTarget.value,
    });
  }

  function handleSaveEditedMeal(e: React.SyntheticEvent) {
    e.preventDefault();

    const valueIndex =
      databaseData[`${format(startDate, "PPP")}`][
        mealType as keyof MealState
      ]?.findIndex((s) => s?.title === currentRecipe.title) || 0;

    if (mealType) {
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
          setModalOpen(false); //updating modal set to loading??
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      update(
        ref(
          database,
          `users/${activeUser.uid}/favorites/${editedRecipe.title}`
        ),
        {
          ...editedRecipe,
          ingredients: [...convertArray(editedRecipe.ingredients)],
          directions: [...convertArray(editedRecipe.directions)],
        }
      )
        .then(() => {
          setModalOpen(false); //updating modal set to loading??
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setTrigger(!trigger);
    setEdit(false);
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
