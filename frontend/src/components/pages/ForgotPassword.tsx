import { useNavigate } from "react-router-dom";
import Banner from "../Banner";
import PasswordReset from "../login/PasswordReset";
import Center from "../../utils/Center";
import { Button, Box } from "@mui/material";

const ForgotPassword = () => {
  const navigate = useNavigate();

  function returnToLogin() {
    navigate("/login");
  }

  //fix this page

  return (
    <Center height={90}>
      <Banner />
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
        <Button size="large" variant="contained" onClick={returnToLogin}>
          return to login
        </Button>
      </Box>
    </Center>
  );
};

export default ForgotPassword;
