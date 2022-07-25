import { useContext } from "react";
import { UserDataContext } from "../../context/userData";
import { Typography } from "@mui/material";
import uuid from "react-uuid";

const ViewRecipe = () => {
  const { currentRecipe } = useContext(UserDataContext);

  return (
    <>
      <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
        {currentRecipe.title}
      </Typography>

      {currentRecipe.url && (
        <a href={`${currentRecipe.url}`} target="_blank" rel="noreferrer">
          {new URL(currentRecipe.url).hostname.replace("www.", "")}
        </a>
      )}
      <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
        Ingredients
      </Typography>

      <ul>
        {currentRecipe.ingredients?.map((item: any) => (
          <li key={uuid()}>{item}</li>
        ))}
      </ul>

      <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
        Directions
      </Typography>

      <ul>
        {currentRecipe.directions?.map((item: any) => (
          <li key={uuid()}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default ViewRecipe;
