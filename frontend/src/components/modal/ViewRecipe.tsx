import React, { useContext } from "react";
import { UserDataContext } from "../../context/userData";
import { Typography, Button, Link, useTheme } from "@mui/material";
import type * as CSS from "csstype";

const ViewRecipe = () => {
  const { currentRecipe, setEdit } = useContext(UserDataContext);
  const theme = useTheme();

  const style: CSS.Properties = {
    color: theme.palette.secondary.main, // Type error on property
    fontWeight: "bold",
  };

  return (
    <>
      <Typography variant="h6">{currentRecipe.title}</Typography>

      {currentRecipe.url && (
        <Link href={`${currentRecipe.url}`} target="_blank" rel="noreferrer">
          {new URL(currentRecipe.url).hostname.replace("www.", "")}
        </Link>
      )}
      <Typography variant="h6" sx={{ marginTop: "1rem" }}>
        Ingredients
      </Typography>

      <ul>
        {currentRecipe.ingredients?.map((item: any) => (
          <li key={item} style={style}>
            <Typography color={theme.palette.grey[700]}>{item}</Typography>
          </li>
        ))}
      </ul>

      <Typography variant="h6" sx={{ marginTop: "1rem" }}>
        Directions
      </Typography>

      <ol>
        {currentRecipe.directions?.map((item: any) => (
          <li key={item} style={style}>
            <Typography color={theme.palette.grey[700]}>{item}</Typography>
          </li>
        ))}
      </ol>
      <Button
        variant="contained"
        onClick={() => setEdit(true)}
        sx={{ marginTop: "1rem" }}
      >
        edit recipe
      </Button>
    </>
  );
};

export default ViewRecipe;
