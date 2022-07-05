import { useState, useEffect } from "react";
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
import { ReceiptRounded } from "@mui/icons-material";
import { update, ref } from "firebase/database";
import { database } from "../../config/firebase";
import { format } from "date-fns";

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
  startDate: Date;
  activeUser: {
    uid?: string | null;
    email?: string | null;
    displayName?: string | null;
  };
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  trigger: boolean;
};

const EditMealRecipe = ({
  recipe,
  item,
  databaseData,
  startDate,
  activeUser,
  trigger,
  setTrigger,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState({
    title: recipe.title,
    url: recipe.url || "",
    ingredients: recipe.ingredients
      ? recipe.ingredients.map((item: any) => `${item} \n`).join("")
      : "",
    directions: recipe.directions
      ? recipe.directions.map((item: any) => `${item} \n`).join("")
      : "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEdit(false);
  };
  const handleEditOpen = () => setEdit(true);
  const handleEditClose = () => setEdit(false);

  const handleChangeRecipe = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eTarget = e.target as HTMLInputElement;
    let key: string = eTarget.name;

    setEditedRecipe({
      ...editedRecipe,
      url: recipe.url || "",
      [key]: eTarget.value,
    });
  };

  //clean up functions throughout changing to functions and now fatty arrows
  //add toast for errors in axios calls

  const handleSaveEditedMeal = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const valueIndex =
      databaseData[item as keyof MealState]?.findIndex(
        (s: any) => s.title === recipe.title
      ) || 0;

    setEditedRecipe({
      ...editedRecipe,
      ingredients: [
        ...editedRecipe.ingredients
          .trim()
          .split("\n")
          .filter((i: string) => i),
      ],
      directions: [
        ...editedRecipe.directions
          .trim()
          .split("\n")
          .filter((i: string) => i),
      ],
    });

    setEditedRecipe((state) => {
      update(
        ref(
          database,
          `users/${activeUser.uid}/meals/${format(
            startDate,
            "PPP"
          )}/${item}/${valueIndex}`
        ),
        {
          ...state,
        }
      )
        .then(() => {
          setTrigger(!trigger);
        })
        .catch((error) => {
          console.log(error);
        });
      return state;
    });

    setEdit(false);
    //get recipe from database to display
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
            <Box sx={style}>
              <form onSubmit={handleSaveEditedMeal}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Edit Recipe Name"
                    multiline
                    value={editedRecipe.title}
                    fullWidth
                    name="title"
                    onChange={handleChangeRecipe}
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
                  value={editedRecipe.ingredients}
                  fullWidth
                  name="ingredients"
                  onChange={handleChangeRecipe}
                />

                <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                  Directions
                </Typography>
                {edit && (
                  <TextField
                    id="outlined-multiline-static"
                    label="Edit Directions"
                    multiline
                    value={editedRecipe.directions}
                    fullWidth
                    name="directions"
                    onChange={handleChangeRecipe}
                  />
                )}
                <button type="submit">save changes</button>
                <button onClick={handleEditClose}>cancel changes</button>
              </form>
            </Box>
          )}
        </>
      </Modal>
    </div>
  );
};

export default EditMealRecipe;
