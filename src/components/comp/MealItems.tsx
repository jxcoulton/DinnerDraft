import { Card, Typography, IconButton } from "@mui/material";
import { set, ref } from "firebase/database";
import { database } from "../../config/firebase";
import { format } from "date-fns";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import uuid from "react-uuid";

type Props = {
  item: string;
  databaseData: {
    [key: string]: string[];
  };
  startDate: Date;
  activeUser: {
    uid?: string | null;
    email?: string | null;
    displayName?: string | null;
  };
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  trigger: boolean;
};

const MealItems = ({
  item,
  databaseData,
  startDate,
  activeUser,
  setTrigger,
  trigger,
}: Props) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    const eTarget = e.target as HTMLInputElement;

    const value = (element: string) => element === eTarget.value;
    const newMeal = databaseData[item];
    const valueIndex = databaseData[item].findIndex(value);
    newMeal.splice(valueIndex, 1);

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
      {databaseData[item]?.map((item) => (
        <Card
          key={uuid()}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            borderRadius: "0px",
          }}
        >
          <Typography variant="h6" paddingX={"10%"} paddingY={"2%"}>{item}</Typography>
          <IconButton value={item} onClick={handleDelete}>
            <DeleteIcon/>
          </IconButton>
        </Card>
      ))}
    </div>
  );
};

export default MealItems;
