import { useState, useContext } from "react";
import { Modal } from "@mui/material";
import RecipeModal from "./RecipeModal";
import EditRecipeModal from "./EditRecipeModal";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { UserDataContext } from "../context/userData";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  minWidth: 350,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "80vh",
  overflow: "scroll",
};

type Props = {
  recipe: {
    [key: string]: any;
  };
  mealType: string;
};

const ViewRecipeModal = ({ recipe, mealType }: Props) => {
  const { modalOpen, setModalOpen } = useContext(UserDataContext);
  const [edit, setEdit] = useState(false);

  function handleClose() {
    setModalOpen(false);
    setEdit(false);
  }

  return (
    <Modal
      keepMounted
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        {!edit ? (
          <>
            <RecipeModal recipe={recipe} />
            <button onClick={() => setEdit(true)}>edit</button>
          </>
        ) : (
          <>
            <EditRecipeModal recipe={recipe} mealType={mealType} />
            <button onClick={() => setEdit(false)}>cancel changes</button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ViewRecipeModal;
