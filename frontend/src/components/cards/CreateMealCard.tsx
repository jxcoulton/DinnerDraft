import React, { useContext, useRef } from "react";
import { UserDataContext } from "../../context/userData";
import { PublicVariablesContext } from "../../context/PublicVariables";
import IMealState from "../../interface/IMealState";
import IInputValueState from "../../interface/IInputValueState";
import { ref, update } from "firebase/database";
import { database } from "../../config/firebase";
import { format } from "date-fns";
import { Card, InputBase, IconButton, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import AutoCompleteCard from "./AutoCompleteCard";
import uuid from "react-uuid";
import LoadingBar from "../common/LoadingBar";

type Props = {
  mealType?: string;
};

const defaultIOpenState = {
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
  const { loadingBar, setLoadingBar, setShowAlert } = useContext(
    PublicVariablesContext
  );
  const inputRef = useRef<any>();
  const theme = useTheme();

  function autoComplete(input: string) {
    return Object.values(userFavorites)?.filter((e) =>
      e.title.toLowerCase().includes(input.toLowerCase())
    );
  }

  async function handleSetMeal(e: React.FormEvent) {
    e.preventDefault();
    setLoadingBar(true);
    const eTarget = e.target as HTMLInputElement;
    //mealName needs keyof reference that can be either IInputValueState or IMealState
    const mealName =
      (eTarget.name as keyof IInputValueState) ||
      (eTarget.name as keyof IMealState);
    //database data for selected data
    const todaysMeal = databaseData[`${format(startDate, "PPP")}`];
    //set a variable to set the state to at the end of the function
    let newMeal: IMealState = {};
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
        .post("https://dinner-draft-backend.vercel.app/recipe", {
          url: value[mealName],
        })
        .then((res) => {
          const recipe = res.data.recipe;
          recipe.id = uuid();
          recipe.ingredients = mapListToDisplay(recipe.ingredients);
          recipe.directions = mapListToDisplay(recipe.directions);
          //if entered in planner set favorite to false, if entered in favorites sets to true
          recipe.favorite = mealType ? false : true;
          newMeal = {
            [eTarget.name]: [...previousMeal, recipe],
          };
        })
        .catch((error) => {
          setLoadingBar(false);
          setShowAlert({
            show: true,
            severity: "error",
            message: `${error.message}`,
          });
        });
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
            {
              title: value[mealName],
              favorite: mealType ? false : true,
              id: uuid(),
            },
          ],
        };
      }
    }

    //if entered in planner set to meals database
    if (Object.keys(newMeal).length) {
      if (mealType) {
        update(
          ref(
            database,
            `users/${activeUser.uid}/meals/${format(startDate, "PPP")}`
          ),
          {
            ...newMeal,
          }
        )
          .then(() => {
            setLoadingBar(false);
          })
          .catch((error) => {
            setLoadingBar(false);
            setShowAlert({
              show: true,
              severity: "error",
              message: `${error.message}`,
            });
          });
        //if entered in favorites tab set title as key and recipe as value
      } else {
        update(ref(database, `users/${activeUser.uid}/favorites`), {
          [Object.values(newMeal)[0][0].id]: {
            ...Object.values(newMeal)[0][0],
          },
        })
          .then(() => {
            setLoadingBar(false);
          })
          .catch((error) => {
            setLoadingBar(false);
            setShowAlert({
              show: true,
              severity: "error",
              message: `${error.message}`,
            });
          });
      }
      setShowAlert({
        show: true,
        severity: "success",
        message: `Recipe Added`,
      });
    }
    setLoadingBar(false);
    setValue(defaultValueState);
    setTrigger(!trigger);
    if (inputRef?.current !== undefined) {
      inputRef.current.firstChild.value = "";
    }
    setAddMealItemOpen(defaultIOpenState);
  }

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        borderRadius: "0px",
        backgroundColor: theme.palette.grey[50],
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
            setValue({
              ...value,
              [e.target.name]: e.target.value,
            })
          }
          placeholder={
            !loadingBar ? `Add custom recipe or recipe URL` : "Loading..."
          }
          sx={{ width: "80%", padding: "15px 10%" }}
          disabled={loadingBar}
          ref={inputRef}
        />

        <LoadingBar />
        {value[mealType as keyof typeof value] && (
          <AutoCompleteCard
            mealType={mealType}
            autoComplete={autoComplete}
            inputRef={inputRef}
          />
        )}
        <IconButton
          type="submit"
          color="primary"
          disabled={!Object.values(value).some((val) => val)}
        >
          <AddIcon />
        </IconButton>
      </form>
    </Card>
  );
};

export default CreateMealCard;
