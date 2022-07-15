import { useContext } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ViewRecipeModal from "./ViewRecipeModal";
import { UserDataContext } from "../context/userData";

type Props = {
  recipe: {
    [key: string]: any;
  };
  mealType: string;
};

const EditMealRecipe = ({ recipe, mealType }: Props) => {
  const { setModalOpen } = useContext(UserDataContext);

  function handleOpen() {
    setModalOpen(true);
  }

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <EditIcon />
      </IconButton>
      <ViewRecipeModal recipe={recipe} mealType={mealType} />
    </div>
  );
};

export default EditMealRecipe;
