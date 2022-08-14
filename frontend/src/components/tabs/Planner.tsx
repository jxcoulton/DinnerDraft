import React from "react";
import DateButtons from "../buttons/DateButtons";
import { Card, useTheme } from "@mui/material";

const Planner: React.FC = () => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.grey[50],
      }}
    >
      <DateButtons />
    </Card>
  );
};

export default Planner;
