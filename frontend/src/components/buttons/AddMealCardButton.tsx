import { useContext } from "react";
import { UserDataContext } from "../../context/userData";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

type Props = {
  mealType?: string;
};

const AddMealCardButton = ({ mealType }: Props) => {
  const { setAddMealItemOpen } = useContext(UserDataContext);

  function handleOpen(e: React.MouseEvent) {
    e.preventDefault();
    const eTarget = e.target as HTMLInputElement;

    setAddMealItemOpen({
      [eTarget.name]: true,
    });
  }

  return (
    <IconButton name={mealType} onClick={handleOpen}>
      <AddCircleIcon sx={{ pointerEvents: "none" }} />
    </IconButton>
  );
};

export default AddMealCardButton;
