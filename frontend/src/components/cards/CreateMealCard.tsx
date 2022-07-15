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
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  mealType: string;
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
    setDateMeal,
  } = useContext(UserDataContext);

  const backend = "https://dinner-draft-backend.vercel.app/recipe";

  function handleChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setValue({ ...value, [e.target.name]: e.target.value });
  }

  async function handleSetMeal(e: React.FormEvent) {
    e.preventDefault();
    const eTarget = e.target as HTMLInputElement;
    const mealName =
      (eTarget.name as keyof InputValueState) ||
      (eTarget.name as keyof MealState);
    let setMeal: MealState = {};

    if (value[mealName]?.includes("http")) {
      await axios
        .post(backend, {
          url: value[mealName],
        })
        .then((res) => {
          const recipe = res.data.recipe;
          recipe.ingredients = mapListToDisplay(recipe.ingredients);
          recipe.directions = mapListToDisplay(recipe.directions);
          setMeal = {
            [eTarget.name]: [
              ...(dateMeal[mealName] ? (dateMeal[mealName] as Array<any>) : []),
              recipe,
            ],
          };
        })
        .catch((err) => console.log(err)); //set up toast
    } else if (value[mealName]) {
      setMeal = {
        [eTarget.name]: [
          ...(dateMeal[mealName] ? (dateMeal[mealName] as Array<any>) : []),
          { title: value[mealName] },
        ],
      };
    }

    setDateMeal(() => {
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
      return setMeal;
    });

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
        style={{ width: "100%", padding: "2% 0", paddingLeft: "10%" }}
      >
        <InputBase
          autoFocus
          name={mealType}
          value={value[mealType as keyof typeof value]}
          onChange={handleChangeValue}
          placeholder={`Add custom ${mealType} item or recipe URL`}
          sx={{ width: "80%" }}
        />
        <IconButton type="submit" color="primary">
          <AddIcon />
        </IconButton>
      </form>
      <IconButton onClick={() => setAddMealItemOpen(defaultOpenState)}>
        <CloseIcon />
      </IconButton>
    </Card>
  );
};

export default CreateMealCard;
