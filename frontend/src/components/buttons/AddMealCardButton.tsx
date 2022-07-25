import { useContext } from "react";
import { UserDataContext } from "../../context/userData";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

type Props = {
  mealType?: string;
};

const AddMealCardButton: React.FC<Props> = ({ mealType }: Props) => {
  const { setAddMealItemOpen } = useContext(UserDataContext);

  //open input for new item
  function handleOpen(e: React.MouseEvent) {
    e.preventDefault();

    setAddMealItemOpen({
      [(e.target as HTMLInputElement).name]: true,
    });
  }

  return (
    <IconButton name={mealType} onClick={handleOpen}>
      <AddCircleIcon sx={{ pointerEvents: "none" }} />
    </IconButton>
  );
};

export default AddMealCardButton;
