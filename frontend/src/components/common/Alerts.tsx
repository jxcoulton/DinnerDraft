import { useEffect, useContext } from "react";
import { PublicVariablesContext } from "../../context/PublicVariables";
import { Alert, Box } from "@mui/material";

function Alerts() {
  const { showAlert, setShowAlert } = useContext(PublicVariablesContext);

  useEffect(() => {
    const timeId = setTimeout(() => {
      console.log("ran");
      setShowAlert({ show: false });
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [setShowAlert, showAlert.show]);

  if (!showAlert.show) {
    return null;
  }

  return (
    <Box sx={{ position: "absolute", top: "5%", left: "5%" }}>
      <Alert severity={showAlert.severity}>{showAlert.message}</Alert>
    </Box>
  );
}

export default Alerts;
