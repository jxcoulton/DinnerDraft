import React from "react";
import Logout from "../auth/Logout";
import { Card, Typography } from "@mui/material";
import { display } from "@mui/system";

const Banner: React.FC = () => {
  return (
    <Card sx={{ height: "10vh", width: "100vw", backgroundColor: "lightblue", boxShadow: "none", display: "flex", alignItems: "center", justifyContent: "space-evenly"}}>
      <Typography variant="h3">Dinner Draft</Typography>
      <Logout />
    </Card>
  );
};

export default Banner;
