import React, { useContext } from "react";
import { UserDataContext } from "../context/userData";
import LogoutButton from "./buttons/LogoutButton";
import { Card, Typography } from "@mui/material";

const Banner: React.FC = () => {
  const { activeUser } = useContext(UserDataContext);

  return (
    <Card
      sx={{
        height: "10vh",
        width: "100vw",
        backgroundColor: "lightblue",
        boxShadow: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Typography variant="h3">Dinner Draft</Typography>
      {activeUser.uid && <LogoutButton />}
    </Card>
  );
};

export default Banner;
