import React, { useContext } from "react";
import MealState from "../interface/MealState";
import { UserDataContext } from "../context/userData";
import { set, ref } from "firebase/database";
import { database } from "../../config/firebase";
import { format } from "date-fns";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";

type Props = {
  mealType: string;
  title: string;
};

const RemoveItemButton = ({ mealType, title }: Props) => {
  const { activeUser, startDate, databaseData, trigger, setTrigger } =
    useContext(UserDataContext);

  function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    const eTarget = e.currentTarget as HTMLInputElement;
    const newMeal = databaseData[mealType as keyof MealState];
    const valueIndex =
      databaseData[mealType as keyof MealState]?.findIndex(
        (s: any) => s.title === eTarget.value
      ) || 0;

    if (valueIndex === 0 || valueIndex > 0) {
      newMeal?.splice(valueIndex, 1);
    }

    set(
      ref(
        database,
        `users/${activeUser.uid}/meals/${format(startDate, "PPP")}/${mealType}`
      ),
      {
        ...newMeal,
      }
    );
    setTrigger(!trigger);
  }

  return (
    <IconButton value={title} onClick={handleDelete}>
      <DeleteForeverIcon />
    </IconButton>
  );
};

export default RemoveItemButton;
