import SignInGoogle from "../login/SignInGoogle";
import SignInExisting from "../login/SignInExisting";
import { Box, Typography, Link, useTheme } from "@mui/material";

const SignUpAndIn = () => {
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
          Login to your account
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

        <SignInExisting />

        <Typography marginTop={"2rem"}>Don't have an account?</Typography>
        <Link href="/register" textTransform={"uppercase"}>
          Register now
        </Link>
      </Box>
      <Link
        href="/reset"
        textTransform={"uppercase"}
        margin={"0 auto"}
        color={theme.palette.grey[50]}
      >
        Forgot password?
      </Link>
    </Box>
  );
};

export default SignUpAndIn;
