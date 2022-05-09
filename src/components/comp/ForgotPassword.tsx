import { useEffect } from "react";
import PasswordReset from "../auth/PasswordReset";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";
import Center from "../utils/Center";

const ForgotPassword = () => {
  const navigate = useNavigate();
  useEffect(() => {}, []);

  const returnToLogin = () => {
    navigate("/login");
  };

  return (
    <Center height={90}>
      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        boxShadow={2}
        margin={3}
        padding={2}
      >
        <PasswordReset />
        <Button size="large" variant="contained" onClick={returnToLogin}>
          return to login
        </Button>
      </Box>
    </Center>
  );
};

export default ForgotPassword;
