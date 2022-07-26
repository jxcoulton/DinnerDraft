import { useState, useContext } from "react";
import { UserDataContext } from "../../context/userData";
import ViewRecipe from "./ViewRecipe";
import EditRecipe from "./EditRecipe";
import { Box } from "@mui/system";
import { Modal } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
  mealType?: string;
};

const RecipeModal = ({ mealType }: Props) => {
  const { modalOpen, setModalOpen } = useContext(UserDataContext);
  const [edit, setEdit] = useState(false);

  function handleClose() {
    setModalOpen(false);
    setEdit(false);
  }

  //fix modal flash on change

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
            <ViewRecipe />
            <button onClick={() => setEdit(true)}>edit</button>
          </>
        ) : (
          <>
            <EditRecipe mealType={mealType} setEdit={setEdit} />
            <button onClick={() => setEdit(false)}>cancel changes</button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default RecipeModal;
