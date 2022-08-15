import React, { useContext } from "react";
import IMealState from "../../interface/IMealState";
import { UserDataContext } from "../../context/userData";
import { PublicVariablesContext } from "../../context/PublicVariables";
import { set, ref } from "firebase/database";
import { database } from "../../config/firebase";
import { format } from "date-fns";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";

type Props = {
  mealType: string;
  recipe: {
    [key: string]: any;
  };
};

const DeleteMealButton: React.FC<Props> = ({ mealType, recipe }: Props) => {
  const { activeUser, startDate, databaseData, trigger, setTrigger } =
    useContext(UserDataContext);
  const { setShowAlert } = useContext(PublicVariablesContext);

  //selected dates database data
  const DatabaseDataByDate = databaseData[`${format(startDate, "PPP")}`];

  function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    //set selected dates item by mealtime to array
    const newMeal = DatabaseDataByDate[mealType as keyof IMealState];

    //find the index of the item to delete from the new meal array
    const valueIndex = newMeal?.findIndex((s) => s?.id === recipe.id) || 0;

    //if index exists splice out that item and set new indexes
    if (valueIndex >= 0) {
      newMeal?.splice(valueIndex, 1);
    }

    //use set to update the whole array with new index values to avoid errors
    set(
      ref(
        database,
        `users/${activeUser.uid}/meals/${format(startDate, "PPP")}/${mealType}`
      ),
      {
        ...newMeal,
      }
    )
      .then(() => {
        setShowAlert({
          show: true,
          severity: "warning",
          message: `Recipe Deleted`,
        });
      })
      .catch((error) => {
        setShowAlert({
          show: true,
          severity: "error",
          message: `${error.message}`,
        });
      });
    setTrigger(!trigger);
  }

  return (
    <IconButton value={recipe.title} onClick={handleDelete}>
      <DeleteForeverIcon fontSize={"medium"} sx={{ pointerEvents: "none" }} />
    </IconButton>
  );
};

export default DeleteMealButton;
