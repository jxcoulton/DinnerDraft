import { useContext } from "react";
import { UserDataContext } from "../../context/userData";
import { PublicVariablesContext } from "../../context/PublicVariables";
import ViewRecipe from "./ViewRecipe";
import EditRecipe from "./EditRecipe";
import { Box } from "@mui/system";
import { Modal } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoadingBar from "../common/LoadingBar";

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

const RecipeModal = () => {
  const { modalOpen, setModalOpen, edit, setEdit } =
    useContext(UserDataContext);
  const { loadingBar } = useContext(PublicVariablesContext);

  function handleClose() {
    setModalOpen(false);
    setEdit(false);
  }

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        {!loadingBar ? (
          !edit ? (
            <>
              <ViewRecipe />
              <button onClick={() => setEdit(true)}>edit</button>
            </>
          ) : (
            <>
              <EditRecipe />
              <button onClick={() => setEdit(false)}>cancel changes</button>
            </>
          )
        ) : (
          <LoadingBar />
        )}
      </Box>
    </Modal>
  );
};

export default RecipeModal;
