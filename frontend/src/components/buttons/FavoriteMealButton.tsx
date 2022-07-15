import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite"; //filled
import { IconButton } from "@mui/material";

const FavoriteMealButton = () => {
  //create a state for favorites and add items to database. pull from database to auto populate favorite items

  return (
    <IconButton>
      <FavoriteBorderIcon />
    </IconButton>
  );
};

export default FavoriteMealButton;
