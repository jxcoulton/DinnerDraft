import { useState } from "react";
import {
  IconButton,
  Box,
  Modal,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import uuid from "react-uuid";
import CloseIcon from "@mui/icons-material/Close";
import MealState from "../interface/MealState";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  // minWidth: 400,
  bgcolor: "background.paper",
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
  item: string;
  databaseData: MealState;
};

const EditMealRecipe = ({ recipe, item, databaseData }: Props) => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEdit(false);
  };
  const handleEditOpen = () => setEdit(true);
  const handleEditClose = () => setEdit(false);

  const handleSaveEditedMeal = (e: React.FormEventHandler) => {
    // e.preventDefault();

    // const eTarget = e.target as HTMLInputElement;
    // console.log(eTarget);
    // const newMeal = databaseData[item as keyof MealState];
    // console.log(eTarget.parentElement);

    // const valueIndex =
    //   databaseData[item as keyof MealState]?.findIndex(
    //     (s: any) => s.title === eTarget.value
    //   ) || 0;
    // console.log(valueIndex);

    //find item type (ie: lunch)
    //find index
    //input values of both into database call

    // update(
    //   ref(
    //     database,
    //     `users/${activeUser.uid}/meals/${format(startDate, "PPP")}`
    //   ),
    //   {
    //     ...state,
    //   }
    // )
    //   .then(() => {})
    //   .catch((error) => {
    //     console.log(error);
    //   });
    setEdit(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>view / edit</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <>
          {!edit && (
            <Box sx={style}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  id="keep-mounted-modal-title"
                  variant="h6"
                  component="h2"
                >
                  {recipe.title}
                </Typography>

                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
              {recipe.url && (
                <a href={recipe.url} target="_blank" rel="noreferrer">
                  {new URL(recipe.url).hostname.replace("www.", "")}
                </a>
              )}
              <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                Ingredients
              </Typography>

              <ul>
                {recipe.ingredients?.map((item: any) => (
                  <li key={uuid()}>{item}</li>
                ))}
              </ul>

              <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                Directions
              </Typography>

              <ul>
                {recipe.directions?.map((item: any) => (
                  <li key={uuid()}>{item}</li>
                ))}
              </ul>

              <button onClick={handleEditOpen}>edit</button>
            </Box>
          )}
          {edit && (
            <form >
              {/* <form onSubmit={handleSaveEditedMeal}> */}
              <Box sx={style}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Edit Recipe Name"
                    multiline
                    defaultValue={recipe.title}
                    fullWidth
                  />

                  <IconButton onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                {recipe.url && (
                  <a href={recipe.url} target="_blank" rel="noreferrer">
                    {new URL(recipe.url).hostname.replace("www.", "")}
                  </a>
                )}
                <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                  Ingredients
                </Typography>

                <TextField
                  id="outlined-multiline-static"
                  label="Edit Ingredients"
                  multiline
                  defaultValue={recipe.ingredients
                    ?.map((item: any) => `${item} \n`)
                    .join("")}
                  fullWidth
                />

                <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                  Directions
                </Typography>
                {edit && (
                  <TextField
                    id="outlined-multiline-static"
                    label="Edit Directions"
                    multiline
                    defaultValue={recipe.directions
                      ?.map((item: any) => `${item} \n`)
                      .join("")}
                    fullWidth
                  />
                )}
                <button type="submit">save changes</button>
                <button onClick={handleEditClose}>cancel changes</button>
              </Box>
            </form>
          )}
        </>
      </Modal>
    </div>
  );
};

export default EditMealRecipe;
