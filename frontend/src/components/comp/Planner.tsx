import React from "react";
import DatePicker from "./DatePicker";
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
      <DatePicker />
    </Card>
  );
};

export default Planner;
