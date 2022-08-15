import SignInGoogle from "../login/SignInGoogle";
import SignUpNewUser from "../login/SignUpNewUser";
import { Box, Typography, Link, useTheme } from "@mui/material";

const Register = () => {
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
          Register for an account
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

        <SignUpNewUser />

        <Typography sx={{ marginTop: "2rem" }}>
          Already have an account?
        </Typography>
        <Link href="/login" sx={{ textTransform: "uppercase" }}>
          Login
        </Link>
      </Box>
    </Box>
  );
};

export default Register;
