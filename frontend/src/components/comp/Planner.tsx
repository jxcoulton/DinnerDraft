import React, { useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import MainState from "../interface/MainState";
import DatePicker from "./DatePicker";
import { Card } from "@mui/material";

const defaultMainState = {
  uid: null,
  email: null,
  displayName: null,
};

const Planner: React.FC = () => {
  const [activeUser, setActiveUser] = useState<MainState>(defaultMainState);

  useEffect(() => {
    const unsubscribeAuthChange = onAuthStateChanged(auth, () => {
      if (auth.currentUser) {
        setActiveUser({
          uid: auth.currentUser.uid,
          email: auth.currentUser.email,
          displayName: auth.currentUser.displayName,
        });
      } else {
        setActiveUser(defaultMainState);
      }
    });

    return () => {
      unsubscribeAuthChange();
    };
  }, [activeUser.uid]);

  return (
    <Card
      sx={{
        minHeight: "80vh",
        marginBottom: "10vh",
        backgroundColor: "lightgrey",
      }}
    >
      <DatePicker activeUser={activeUser} />
    </Card>
  );
};

export default Planner;
