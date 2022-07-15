import { Typography } from "@mui/material";
import uuid from "react-uuid";

type Props = {
  recipe: {
    [key: string]: any;
  };
};

const ViewRecipe = ({ recipe }: Props) => {
  return (
    <>
      <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
        {recipe.title}
      </Typography>

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
    </>
  );
};

export default ViewRecipe;
