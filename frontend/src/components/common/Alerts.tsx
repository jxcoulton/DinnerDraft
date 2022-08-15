import { useEffect, useContext } from "react";
import { UserDataContext } from "../../context/userData";
import { Alert, Box } from "@mui/material";

function Alerts() {
  const { showAlert, setShowAlert } = useContext(UserDataContext);

  useEffect(() => {
    const timeId = setTimeout(() => {
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
    <Box sx={{ position: "fixed", top: "1rem", left: "1rem", zIndex: 9999 }}>
      <Alert variant="filled" severity={showAlert.severity}>
        {showAlert.message}
      </Alert>
    </Box>
  );
}

export default Alerts;
