import PasswordReset from "../login/PasswordReset";
import { Link, Box, Typography } from "@mui/material";

const ForgotPassword = () => {
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
          padding: "1rem",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "2rem" }}>
          Forgot password?
        </Typography>

        <PasswordReset />

        <Link
          href="/login"
          sx={{ marginTop: "2rem", textTransform: "uppercase" }}
        >
          Return to login
        </Link>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
