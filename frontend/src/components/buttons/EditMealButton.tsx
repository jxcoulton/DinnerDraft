import { useContext } from "react";
import { UserDataContext } from "../../context/userData";
import RecipeModal from "../modal/RecipeModal";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

type Props = {
  recipe: {
    [key: string]: any;
  };
  mealType?: string;
};

const EditMealButton: React.FC<Props> = ({ recipe, mealType }: Props) => {
  const { setModalOpen, setCurrentRecipe } = useContext(UserDataContext);

  //open modal and set the selected recipe to display
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
