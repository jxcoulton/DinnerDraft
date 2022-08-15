import { useContext } from "react";
import { UserDataContext } from "../../context/userData";
import { Typography, Button, Link } from "@mui/material";

const ViewRecipe = () => {
  const { currentRecipe, setEdit } = useContext(UserDataContext);

  return (
    <>
      <Typography variant="h6" component="h2">
        {currentRecipe.title}
      </Typography>

      {currentRecipe.url && (
        <Link href={`${currentRecipe.url}`} target="_blank" rel="noreferrer">
          {new URL(currentRecipe.url).hostname.replace("www.", "")}
        </Link>
      )}
      <Typography sx={{ marginTop: "1rem" }} variant="h6">
        Ingredients
      </Typography>

      <ul>
        {currentRecipe.ingredients?.map((item: any) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <Typography sx={{ marginTop: "1rem" }} variant="h6">
        Directions
      </Typography>

      <ol>
        {currentRecipe.directions?.map((item: any) => (
          <li key={item}>{item}</li>
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
