import SignInGoogle from "../login/SignInGoogle";
import SignInExisting from "../login/SignInExisting";
import { Box, Typography, Link, useTheme } from "@mui/material";

const SignUpAndIn = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.50),  rgba(0, 0, 0, 0.25)), url("LoginBackground.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          boxShadow: "1rem",
          margin: "1.5rem",
          padding: "2rem 0",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <Typography variant="h2" sx={{ marginBottom: "1rem" }}>
          Dinner Draft
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
          Login to your account
        </Typography>

        <SignInGoogle />

        <Box sx={{ display: "flex", alignItems: "center", margin: "1.5rem 0" }}>
          <Box
            sx={{
              height: "1px",
              width: "100px",
              backgroundColor: theme.palette.grey[400],
            }}
          ></Box>
          <Typography
            sx={{ color: `${theme.palette.grey[400]}`, margin: "0 0.5rem" }}
          >
            or
          </Typography>
          <Box
            sx={{
              height: "1px",
              width: "100px",
              backgroundColor: theme.palette.grey[400],
            }}
          ></Box>
        </Box>

        <SignInExisting />

        <Typography sx={{ marginTop: "2rem" }}>
          Don't have an account?
        </Typography>
        <Link href="/register" sx={{ textTransform: "uppercase" }}>
          Register now
        </Link>
      </Box>
      <Link
        href="/reset"
        sx={{
          color: `${theme.palette.grey[50]}`,
          margin: "0 auto",
          textTransform: "uppercase",
        }}
      >
        Forgot password?
      </Link>
    </Box>
  );
};

export default SignUpAndIn;
