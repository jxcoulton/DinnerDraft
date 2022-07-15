import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useContext } from "react";
import { UserDataContext } from "../context/userData";

type Props = {
  mealType: string;
};

const AddNewItemButton = ({ mealType }: Props) => {
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

export default AddNewItemButton;
