import { useContext } from "react";
import { UserDataContext } from "../../context/userData";
import MealState from "../../interface/MealState";
import { update, ref, remove } from "firebase/database";
import { database } from "../../config/firebase";
import { format } from "date-fns";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

type Props = {
  recipe: {
    [key: string]: any;
  };
  mealType?: string;
};

const FavoriteMealButton: React.FC<Props> = ({ recipe, mealType }: Props) => {
  const { databaseData, activeUser, startDate, trigger, setTrigger } =
    useContext(UserDataContext);

  function handleFavorites(e: React.MouseEvent) {
    e.preventDefault();
    const favorited = recipe.favorite ? false : true;

    //find the index of the selected item
    const valueIndex =
      databaseData[`${format(startDate, "PPP")}`][
        mealType as keyof MealState
      ]?.findIndex((s: any) => s.title === recipe.title) || 0;

    //check to see it event occurred in planner (mealType exists) or favorites tab
    if (mealType) {
      //update in planner
      update(
        ref(
          database,
          `users/${activeUser.uid}/meals/${format(
            startDate,
            "PPP"
          )}/${mealType}/${valueIndex}`
        ),
        {
          ...recipe,
          favorite: favorited,
        }
      )
        .then(() => {
          //if favorited add to favorites
          if (favorited) {
            update(ref(database, `users/${activeUser.uid}/favorites`), {
              [recipe.title]: { ...recipe, favorite: true },
            })
              .then(() => {})
              .catch((error) => {
                console.log(error);
              });
            //if unfavorited remove from favorites
          } else {
            remove(
              ref(database, `users/${activeUser.uid}/favorites/${recipe.title}`)
            )
              .then(() => {})
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      //event occurred in favorites tab
    } else {
      //occurred in favorites then remove from favorites
      remove(ref(database, `users/${activeUser.uid}/favorites/${recipe.title}`))
        .then(() => {
          setTrigger(!trigger);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <IconButton onClick={handleFavorites}>
      {recipe.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default FavoriteMealButton;
