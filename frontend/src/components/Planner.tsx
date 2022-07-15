import React from "react";
import DateButtons from "./buttons/DateButtons";
import { Card } from "@mui/material";

const Planner: React.FC = () => {
  return (
    <Card
      sx={{
        minHeight: "80vh",
        marginBottom: "10vh",
        backgroundColor: "lightgrey",
      }}
    >
      <DateButtons />
    </Card>
  );
};

export default Planner;
