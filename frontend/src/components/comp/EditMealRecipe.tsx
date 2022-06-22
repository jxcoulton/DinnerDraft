import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
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
};

const EditMealRecipe = ({ recipe }: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            {recipe.title}
          </Typography>
          {recipe.url}
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            Ingredients
          </Typography>
          {recipe.ingredients?.map((item: any) => (
            <ul>
              <li>{item}</li>
            </ul>
          ))}
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            Directions
          </Typography>
          {recipe.directions?.map((item: any) => (
            <ul>
              <li>{item}</li>
            </ul>
          ))}
        </Box>
      </Modal>
    </div>
  );
};

export default EditMealRecipe;
