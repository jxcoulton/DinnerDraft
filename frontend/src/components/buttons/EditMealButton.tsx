import { useContext, useEffect } from "react";
import { UserDataContext } from "../../context/userData";
import { PublicVariablesContext } from "../../context/PublicVariables";
import RecipeModal from "../modal/RecipeModal";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

type Props = {
  recipe: {
    [key: string]: any;
  };
};

const EditMealButton: React.FC<Props> = ({ recipe }: Props) => {
  const { setModalOpen, setCurrentRecipe, setEdit } =
    useContext(UserDataContext);
  const { setLoadingBar } = useContext(PublicVariablesContext);

  useEffect(() => {
    setCurrentRecipe(recipe);
    setLoadingBar(false);
  }, [recipe, setLoadingBar, setCurrentRecipe]);

  //open modal and set the selected recipe to display
  function handleOpen() {
    setCurrentRecipe(recipe);
    setModalOpen(true);
    setEdit(true);
  }

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <EditIcon />
      </IconButton>
      <RecipeModal />
    </div>
  );
};

export default EditMealButton;
