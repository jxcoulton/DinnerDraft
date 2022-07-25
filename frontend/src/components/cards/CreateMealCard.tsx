import React, { useContext } from "react";
import { UserDataContext } from "../../context/userData";
import MealState from "../../interface/MealState";
import InputValueState from "../../interface/InputValueState";
import { ref, update } from "firebase/database";
import { database } from "../../config/firebase";
import { format } from "date-fns";
import { Card, InputBase, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import AutoCompleteCard from "./AutoCompleteCard";

type Props = {
  mealType?: string;
};

const defaultOpenState = {
  breakfast: false,
  lunch: false,
  dinner: false,
  snack: false,
};

const defaultValueState = {
  breakfast: "",
  lunch: "",
  dinner: "",
  snack: "",
};

//map each item to remove line break and trim
function mapListToDisplay(listItem: string[]) {
  return listItem?.map((i: string) =>
    i.replace(/\n/g, "").replace(/\s+/g, " ").trim()
  );
}

//check if input is url
function validURL(str: string | undefined) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return str ? !!pattern.test(str) : false;
}

const CreateMealCard: React.FC<Props> = ({ mealType }: Props) => {
  const {
    activeUser,
    startDate,
    value,
    setValue,
    trigger,
    setTrigger,
    setAddMealItemOpen,
    userFavorites,
    databaseData,
  } = useContext(UserDataContext);
  const backend = "https://dinner-draft-backend.vercel.app/recipe";

  function autoComplete(input: string) {
    return Object.values(userFavorites)?.filter((e) =>
      e.title.toLowerCase().includes(input.toLowerCase())
    );
  }

  async function handleSetMeal(e: React.FormEvent) {
    e.preventDefault();
    const eTarget = e.target as HTMLInputElement;
    //mealName needs keyof reference that can be either InputValueState or MealState
    const mealName =
      (eTarget.name as keyof InputValueState) ||
      (eTarget.name as keyof MealState);
    //database data for selected data
    const todaysMeal = databaseData[`${format(startDate, "PPP")}`];
    //set a variable to set the state to at the end of the function
    let newMeal: MealState = {};
    //if a meal exists for today and it has the same mealType add new item to array, else create an array
    const previousMeal = [
      ...(todaysMeal
        ? todaysMeal[mealName]
          ? (todaysMeal[mealName] as Array<any>)
          : []
        : []),
    ];
    //found favorites that match the input value
    let found = autoComplete(`${value[mealName]}`);

    //see if value is a url
    if (validURL(value[mealName])) {
      await axios
        .post(backend, {
          url: value[mealName],
        })
        .then((res) => {
          const recipe = res.data.recipe;
          recipe.ingredients = mapListToDisplay(recipe.ingredients);
          recipe.directions = mapListToDisplay(recipe.directions);
          //if entered in planner set favorite to false, if entered in favorites sets to true
          recipe.favorite = mealType ? false : true;
          newMeal = {
            [eTarget.name]: [...previousMeal, recipe],
          };
        })
        .catch((err) => console.log(err));
      //if not url and value is not empty
    } else if (value[mealName]) {
      //if entered in planner and autocomplete results exist and input value = found results title then set to found results
      if (mealType && found.length > 0 && found[0].title === value[mealName]) {
        newMeal = {
          [eTarget.name]: [...previousMeal, found[0]],
        };
        //create new recipe, favorite if entered in favorites else default unfavorited
      } else {
        newMeal = {
          [eTarget.name]: [
            ...previousMeal,
            { title: value[mealName], favorite: mealType ? false : true },
          ],
        };
      }
    }

    //if entered in planner set to meals database
    if (mealType) {
      update(
        ref(
          database,
          `users/${activeUser.uid}/meals/${format(startDate, "PPP")}`
        ),
        {
          ...todaysMeal,
          ...newMeal,
        }
      )
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
      //if entered in favorites tab set title as key and recipe as value
    } else {
      update(ref(database, `users/${activeUser.uid}/favorites`), {
        [Object.values(newMeal)[0][0].title]: {
          ...Object.values(newMeal)[0][0],
        },
      })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    }
    setValue(defaultValueState);
    setTrigger(!trigger);
    setAddMealItemOpen(defaultOpenState);
  }

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        borderRadius: "0px",
        backgroundColor: "#e9e6e6",
        border: "solid 1px dark grey",
      }}
    >
      <form
        name={mealType}
        onSubmit={handleSetMeal}
        autoComplete="off"
        style={{ width: "100%" }}
      >
        <InputBase
          autoFocus
          name={mealType}
          value={value[mealType as keyof typeof value]}
          onChange={(e) =>
            setValue({ ...value, [e.target.name]: e.target.value })
          }
          placeholder={`Add custom recipe or recipe URL`}
          sx={{ width: "80%", padding: "15px 10%" }}
        />
        {value[mealType as keyof typeof value] && (
          <AutoCompleteCard mealType={mealType} autoComplete={autoComplete} />
        )}
        <IconButton type="submit" color="primary">
          <AddIcon />
        </IconButton>
      </form>
    </Card>
  );
};

export default CreateMealCard;
