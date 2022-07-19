import React, { useContext } from "react";
import { UserDataContext } from "../../context/userData";
import MealState from "../../interface/MealState";
import InputValueState from "../../interface/InputValueState";
import axios from "axios";
import { Card, InputBase, IconButton } from "@mui/material";
import { ref, update } from "firebase/database";
import { database } from "../../config/firebase";
import { format } from "date-fns";
import AddIcon from "@mui/icons-material/Add";
import uuid from "react-uuid";

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

function mapListToDisplay(listItem: string[]) {
  return listItem?.map((i: string) =>
    i.replace(/\n/g, "").replace(/\s+/g, " ").trim()
  );
}

const CreateMealCard = ({ mealType }: Props) => {
  const {
    activeUser,
    startDate,
    value,
    setValue,
    trigger,
    setTrigger,
    setAddMealItemOpen,
    dateMeal,
    allData,
  } = useContext(UserDataContext);
  const backend = "https://dinner-draft-backend.vercel.app/recipe";
  let favorites = Object.values(allData);

  function autoComplete(input: string) {
    return favorites?.filter((e: any) =>
      e.title.toLowerCase().includes(input.toLowerCase())
    );
  }

  function handleChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setValue({ ...value, [e.target.name]: e.target.value });
  }

  function handleSetValue(e: any) {
    e.preventDefault();
    setValue({
      ...value,
      [e.target.getAttribute("data-name")]: e.target.innerHTML,
    });
  }

  async function handleSetMeal(e: React.FormEvent) {
    e.preventDefault();
    const eTarget = e.target as HTMLInputElement;
    const mealName =
      (eTarget.name as keyof InputValueState) ||
      (eTarget.name as keyof MealState);
    let setMeal: MealState = {};
    let found = autoComplete(`${value[mealName]}`);

    if (value[mealName]?.includes("http")) {
      await axios
        .post(backend, {
          url: value[mealName],
        })
        .then((res) => {
          const recipe = res.data.recipe;
          recipe.ingredients = mapListToDisplay(recipe.ingredients);
          recipe.directions = mapListToDisplay(recipe.directions);
          recipe.favorite = mealType ? false : true;
          setMeal = {
            [eTarget.name]: [
              ...(dateMeal[mealName] ? (dateMeal[mealName] as Array<any>) : []),
              recipe,
            ],
          };
        })
        .catch((err) => console.log(err)); //set up toast
    } else if (value[mealName]) {
      if (mealType && found.length > 0 && found[0].title === value[mealName]) {
        setMeal = {
          [eTarget.name]: [
            ...(dateMeal[mealName] ? (dateMeal[mealName] as Array<any>) : []),
            found[0],
          ],
        };
      } else {
        setMeal = {
          [eTarget.name]: [
            ...(dateMeal[mealName] ? (dateMeal[mealName] as Array<any>) : []),
            { title: value[mealName], favorite: mealType ? false : true },
          ],
        };
      }
    }

    if (mealType) {
      update(
        ref(
          database,
          `users/${activeUser.uid}/meals/${format(startDate, "PPP")}`
        ),
        {
          ...dateMeal,
          ...setMeal,
        }
      )
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    } else {
      update(ref(database, `users/${activeUser.uid}/favorites`), {
        [Object.values(setMeal)[0][0].title]: {
          ...Object.values(setMeal)[0][0],
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
  //move cancel button to parent replacing the +
  //deactivate the add button if empty

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
          onChange={handleChangeValue}
          placeholder={`Add custom recipe or recipe URL`}
          sx={{ width: "80%", padding: "15px 10%" }}
        />
        {value[mealType as keyof typeof value] && (
          <ul
            style={{
              position: "absolute",
              width: "400px",
              margin: "0",
              padding: "0",
              zIndex: "2",
            }}
          >
            {autoComplete(`${value[mealType as keyof typeof value]}`)?.map(
              (each: any) => (
                <div
                  key={uuid()}
                  onClick={handleSetValue}
                  data-name={mealType}
                  data-value={each}
                  style={{
                    backgroundColor: "#e9e6e6",
                    padding: "15px 20%",
                    width: "auto",
                    border: "solid 0.5px lightgrey",
                    borderBottom: "none",
                  }}
                >
                  {each.title}
                </div>
              )
            )}
          </ul>
        )}
        <IconButton type="submit" color="primary">
          <AddIcon />
        </IconButton>
      </form>
    </Card>
  );
};

export default CreateMealCard;
