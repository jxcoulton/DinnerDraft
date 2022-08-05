import { useContext } from "react";
import { PublicVariablesContext } from "../../context/PublicVariables";
import { Box, CircularProgress } from "@mui/material";

function LoadingCircle() {
  const { loadingCircle } = useContext(PublicVariablesContext);

  if (!loadingCircle) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress variant="indeterminate" size={75} />
    </Box>
  );
}

export default LoadingCircle;
