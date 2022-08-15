import { useContext } from "react";
import { UserDataContext } from "../../context/userData";
import { Box, LinearProgress } from "@mui/material";

function LoadingBar() {
  const { loadingBar } = useContext(UserDataContext);

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
      <LinearProgress variant="indeterminate" sx={{ width: "90%" }} />
    </Box>
  );
}

export default LoadingBar;
