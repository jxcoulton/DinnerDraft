import { Card, Button } from "@mui/material";
import { set, ref } from "firebase/database";
import { database } from "../../config/firebase";
import { format } from "date-fns";
import React from "react";

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

    const name = (element: string) => element === eTarget.name;
    const newMeal = databaseData[item];
    const nameIndex = databaseData[item].findIndex(name);
    newMeal.splice(nameIndex, 1);

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

  const databaseItems =
    !!databaseData[item] &&
    databaseData[item].map((item, i) => (
      <Card key={i}>
        {item}
        <Button name={item} onClick={handleDelete}>
          X
        </Button>
      </Card>
    ));

  return <>{databaseItems}</>;
};

export default MealItems;
