import { useContext } from "react";
import { PublicVariablesContext } from "../../context/PublicVariables";
import { Box, LinearProgress } from "@mui/material";

function LoadingBar() {
  const { loading } = useContext(PublicVariablesContext);

  if (!loading) {
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
      <LinearProgress variant="indeterminate" sx={{ width: "50%" }} />
    </Box>
  );
}

export default LoadingBar;
