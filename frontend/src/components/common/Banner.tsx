import React from "react";
import { Card, Typography, useTheme } from "@mui/material";

const Banner: React.FC = () => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: "0px",
        height: "20vh",
        width: "100vw",
        backgroundImage: `url(
          "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1284456_8-ff3178d.jpg"
        )`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom 15% center",
        boxShadow: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Typography variant="h3">Dinner Draft</Typography>
    </Card>
  );
};

export default Banner;
