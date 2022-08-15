import { useContext } from "react";
import { UserDataContext } from "../../context/userData";
import { PublicVariablesContext } from "../../context/PublicVariables";
import ViewRecipe from "./ViewRecipe";
import EditRecipe from "./EditRecipe";
import { Modal, Card, Typography, Box } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoadingBar from "../common/LoadingBar";

const RecipeModal = () => {
  const { modalOpen, setModalOpen, edit, setEdit } =
    useContext(UserDataContext);
  const { loadingBar } = useContext(PublicVariablesContext);

  function handleClose() {
    setModalOpen(false);
    setEdit(false);
  }

  return (
    <Modal open={modalOpen} onClose={handleClose}>
      <Card
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "95%",
          maxWidth: "600px",
          maxHeight: "85vh",
          backgroundColor: "white",
          padding: "1rem",
          overflowY: "auto",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={2}
        >
          <Typography variant="h5">
            {!edit ? "View Recipe" : "Edit Recipe"}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {!loadingBar ? (
          !edit ? (
            <>
              <ViewRecipe />
            </>
          ) : (
            <>
              <EditRecipe />
            </>
          )
        ) : (
          <LoadingBar />
        )}
      </Card>
    </Modal>
  );
};

export default RecipeModal;
