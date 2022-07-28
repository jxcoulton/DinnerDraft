import { useContext } from "react";
import { UserDataContext } from "../../context/userData";
import MealState from "../../interface/MealState";
import { update, ref, remove } from "firebase/database";
import { database } from "../../config/firebase";
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
  const { databaseData, activeUser, trigger, setTrigger } =
    useContext(UserDataContext);

  function handleFavorites(e: React.MouseEvent) {
    e.preventDefault();
    const favorited = recipe.favorite ? false : true;

    for (var date in databaseData) {
      let dateItems = databaseData[date];
      for (var type in dateItems) {
        let meal = dateItems[type as keyof MealState];
        for (var index in meal) {
          let item = meal[index as unknown as number];
          if (item?.id === recipe.id) {
            if (mealType) {
              //update in planner
              update(
                ref(
                  database,
                  `users/${activeUser.uid}/meals/${date}/${type}/${index}`
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
                      .then(() => {
                        setTrigger(!trigger);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                    //if unfavorited remove from favorites
                  } else {
                    remove(
                      ref(
                        database,
                        `users/${activeUser.uid}/favorites/${recipe.title}`
                      )
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
              //event occurred in favorites tab
            } else {
              //occurred in favorites then remove from favorites
              update(
                ref(
                  database,
                  `users/${activeUser.uid}/meals/${date}/${type}/${index}`
                ),
                {
                  ...recipe,
                  favorite: favorited,
                }
              )
                .then(() => {
                  remove(
                    ref(
                      database,
                      `users/${activeUser.uid}/favorites/${recipe.title}`
                    )
                  )
                    .then(() => {
                      setTrigger(!trigger);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          }
        }
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
