import { useContext } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import RecipeModal from "../modal/RecipeModal";
import { UserDataContext } from "../../context/userData";

type Props = {
  recipe: {
    [key: string]: any;
  };
  mealType: string;
};

const EditMealButton = ({ recipe, mealType }: Props) => {
  const { setModalOpen, setCurrentRecipe } = useContext(UserDataContext);

  function handleOpen() {
    setCurrentRecipe(recipe);
    setModalOpen(true);
  }

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <EditIcon />
      </IconButton>
      <RecipeModal mealType={mealType} />
    </div>
  );
};

export default EditMealButton;
