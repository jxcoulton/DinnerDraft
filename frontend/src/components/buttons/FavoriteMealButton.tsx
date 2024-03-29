import { useContext } from "react";
import { UserDataContext } from "../../context/userData";
import IRecipeState from "../../interface/IRecipeState";
import IMealState from "../../interface/IMealState";
import { update, ref, remove } from "firebase/database";
import { database } from "../../config/firebase";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

type Props = {
  recipe: {
    [key: string]: any;
  };
};

const FavoriteMealButton: React.FC<Props> = ({ recipe }: Props) => {
  const {
    databaseData,
    activeUser,
    trigger,
    setTrigger,
    userFavorites,
    setShowAlert,
  } = useContext(UserDataContext);

  async function handleFavorites(e: React.MouseEvent) {
    e.preventDefault();

    for (var date in databaseData) {
      let dateItems = databaseData[date];
      for (var type in dateItems) {
        let meal = dateItems[type as keyof IMealState];
        for (var index in meal) {
          let item = meal[index as unknown as number];
          if (item?.id === recipe.id) {
            await update(
              ref(
                database,
                `users/${activeUser.uid}/meals/${date}/${type}/${index}`
              ),
              {
                ...recipe,
                favorite: !recipe.favorite,
              }
            )
              .then(() => {
                //if favorited add to favorites
                if (!recipe.favorite) {
                  update(ref(database, `users/${activeUser.uid}/favorites`), {
                    [recipe.id]: { ...recipe, favorite: true },
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
                      `users/${activeUser.uid}/favorites/${recipe.id}`
                    )
                  )
                    .then(() => {
                      setTrigger(!trigger);
                    })
                    .catch((error) => {
                      setShowAlert({
                        show: true,
                        severity: "error",
                        message: `${error.message}`,
                      });
                    });
                }
              })
              .catch((error) => {
                setShowAlert({
                  show: true,
                  severity: "error",
                  message: `${error.message}`,
                });
              });
          }
        }
      }
    }

    for (var fav in userFavorites) {
      let items = userFavorites[fav as keyof IRecipeState] as IRecipeState;
      if (items?.id === recipe.id) {
        await remove(
          ref(database, `users/${activeUser.uid}/favorites/${recipe.id}`)
        )
          .then(() => {
            setTrigger(!trigger);
          })
          .catch((error) => {
            setShowAlert({
              show: true,
              severity: "error",
              message: `${error.message}`,
            });
          });
      }
    }
    setShowAlert({
      show: true,
      severity: `${!recipe.favorite ? "success" : "warning"}`,
      message: `${
        !recipe.favorite ? "Added to favorites" : "Removed from favorites"
      }`,
    });
  }

  return (
    <IconButton onClick={handleFavorites}>
      {recipe.favorite ? (
        <FavoriteIcon
          fontSize={"medium"}
          sx={{ pointerEvents: "none" }}
          color="secondary"
        />
      ) : (
        <FavoriteBorderIcon
          fontSize={"medium"}
          sx={{ pointerEvents: "none" }}
        />
      )}
    </IconButton>
  );
};

export default FavoriteMealButton;
