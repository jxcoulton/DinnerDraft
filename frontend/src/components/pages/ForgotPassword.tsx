import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PasswordReset from "../login/PasswordReset";
import { PublicVariablesContext } from "../../context/PublicVariables";
import { Button, Box } from "@mui/material";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { loading } = useContext(PublicVariablesContext);

  function returnToLogin() {
    navigate("/login");
  }

  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        boxShadow={2}
        margin={3}
        padding={2}
        sx={{ backgroundColor: "white" }}
      >
        <PasswordReset />
        <Button
          size="large"
          variant="contained"
          onClick={returnToLogin}
          disabled={loading}
        >
          return to login
        </Button>
      </Box>
    </>
  );
};

export default ForgotPassword;
