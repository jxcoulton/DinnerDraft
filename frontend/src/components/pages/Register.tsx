import SignInGoogle from "../login/SignInGoogle";
import SignUpNewUser from "../login/SignUpNewUser";
import { Box, Typography, Link, useTheme } from "@mui/material";

const Register = () => {
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
        backgroundPosition: "center",
      }}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        boxShadow={2}
        margin={3}
        paddingY={4}
        maxWidth={"500px"}
        width={"100%"}
        sx={{ backgroundColor: "white" }}
      >
        <Typography variant="h2" marginBottom={2}>
          Dinner Draft
        </Typography>
        <Typography variant="h5" marginBottom={4}>
          Register for an account
        </Typography>

        <SignInGoogle />

        <Box display={"flex"} alignItems={"center"} marginY={3}>
          <Box
            height={"1px"}
            width={"100px"}
            sx={{ backgroundColor: theme.palette.grey[400] }}
          ></Box>
          <Typography marginX={1} color={theme.palette.grey[400]}>
            or
          </Typography>
          <Box
            height={"1px"}
            width={"100px"}
            sx={{ backgroundColor: theme.palette.grey[400] }}
          ></Box>
        </Box>

        <SignUpNewUser />

        <Typography marginTop={"2rem"}>Already have an account?</Typography>
        <Link href="/login" textTransform={"uppercase"}>
          Login
        </Link>
      </Box>
    </Box>
  );
};

export default Register;
