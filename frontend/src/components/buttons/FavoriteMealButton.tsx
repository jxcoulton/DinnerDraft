import { useContext } from "react";
import { UserDataContext } from "../../context/userData";
import MealState from "../../interface/MealState";
import { update, ref, remove } from "firebase/database";
import { database } from "../../config/firebase";
import { format } from "date-fns";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite"; //filled
import { IconButton } from "@mui/material";

type Props = {
  recipe: {
    [key: string]: any;
  };
  mealType?: string;
};

const FavoriteMealButton = ({ recipe, mealType }: Props) => {
  const { databaseData, activeUser, startDate, trigger, setTrigger, allData } =
    useContext(UserDataContext);

  function handleFavorites(e: React.SyntheticEvent) {
    e.preventDefault();
    const favorited = recipe.favorite ? false : true;

    const favoriteIndex = Object.keys(allData)?.findIndex(
      (fav: any) => fav !== recipe.title
    );

    const valueIndex =
      databaseData[mealType as keyof MealState]?.findIndex(
        (s: any) => s.title === recipe.title
      ) || 0;

    if (mealType) {
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
          if (favorited) {
            update(ref(database, `users/${activeUser.uid}/favorites`), {
              [recipe.title]: { ...recipe, favorite: true },
            })
              .then(() => {
                setTrigger(!trigger);
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            remove(
              ref(database, `users/${activeUser.uid}/favorites/${recipe.title}`)
            )
              .then(() => {
                setTrigger(!trigger);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      if (favorited) {
        update(ref(database, `users/${activeUser.uid}/favorites`), {
          [recipe.title]: { ...recipe, favorite: true },
        })
          .then(() => {
            setTrigger(!trigger);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        remove(
          ref(database, `users/${activeUser.uid}/favorites/${recipe.title}`)
        )
          .then(() => {
            setTrigger(!trigger);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }

  return (
    <IconButton onClick={handleFavorites}>
      {recipe.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default FavoriteMealButton;
