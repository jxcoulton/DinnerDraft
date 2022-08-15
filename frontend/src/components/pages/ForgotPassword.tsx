import PasswordReset from "../login/PasswordReset";
import { Link, Box, useTheme, Typography } from "@mui/material";

const ForgotPassword = () => {
  const theme = useTheme();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"100vh"}
      sx={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.25),  rgba(0, 0, 0, 0.25)), url("LoginBackground.jpg")`,
        backgroundSize: "cover",
      }}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        boxShadow={2}
        margin={3}
        padding={2}
        maxWidth={"500px"}
        width={"100%"}
        sx={{ backgroundColor: "white" }}
      >
        <Typography variant="h4" marginBottom={4}>
          Forgot password?
        </Typography>

        <PasswordReset />

        <Link href="/login" marginTop={4} textTransform={"uppercase"}>
          Return to login
        </Link>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
