import { useContext } from "react";
import { PublicVariablesContext } from "../../context/PublicVariables";
import { Box, LinearProgress } from "@mui/material";

function LoadingBar() {
  const { loadingBar } = useContext(PublicVariablesContext);

  if (!loadingBar) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "absolute",
        width: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LinearProgress variant="indeterminate" sx={{ width: "100%" }} />
    </Box>
  );
}

export default LoadingBar;
