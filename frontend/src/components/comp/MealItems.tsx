import { Card, Typography, IconButton } from "@mui/material";
import { set, ref } from "firebase/database";
import { database } from "../../config/firebase";
import { format } from "date-fns";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import uuid from "react-uuid";
import EditMealRecipe from "./EditMealRecipe";
import MealState from "../interface/MealState";
import InputValueState from "../interface/InputValueState";

type Props = {
  item: string;
  databaseData: MealState;
  startDate: Date;
  activeUser: {
    uid?: string | null;
    email?: string | null;
    displayName?: string | null;
  };
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  trigger: boolean;
  value: InputValueState;
};

const MealItems = ({
  item,
  databaseData,
  startDate,
  activeUser,
  setTrigger,
  trigger,
  value,
}: Props) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    const eTarget = e.target as HTMLInputElement;
    const newMeal = databaseData[item as keyof MealState];
    const valueIndex =
      databaseData[item as keyof MealState]?.findIndex(
        (s: any) => s.title === eTarget.value
      ) || 0;

    if (valueIndex === 0 || valueIndex > 0) {
      newMeal?.splice(valueIndex, 1);
    }

    set(
      ref(
        database,
        `users/${activeUser.uid}/meals/${format(startDate, "PPP")}/${item}`
      ),
      {
        ...newMeal,
      }
    );
    setTrigger(!trigger);
  };


  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {databaseData[item as keyof MealState]?.map((each: any) => (
        <Card
          key={uuid()}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            borderRadius: "0px",
          }}
        >
          <Typography variant="h6" paddingX={"10%"} paddingY={"2%"}>
            {each.title}
          </Typography>
          <EditMealRecipe recipe={each} item={item} databaseData={databaseData} />
          <button value={each.title} onClick={handleDelete}>
            X
          </button>
        </Card>
      ))}
    </div>
  );
};

export default MealItems;
