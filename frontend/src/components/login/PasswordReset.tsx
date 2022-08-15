import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../context/userData";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebase";
import { Button, TextField, Box } from "@mui/material";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { setShowAlert } = useContext(UserDataContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const requestPasswordReset = () => {
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        navigate("/login");
      })
      .then(() => {
        setShowAlert({
          show: true,
          severity: "success",
          message: "Recovery email sent",
        });
      })
      .catch((error) => {
        setLoading(false);
        setShowAlert({
          show: true,
          severity: "error",
          message: `${error.message}`,
        });
      });
    setEmail("");
  };

  return (
    <Box
      sx={{
        width: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TextField
        label="Email"
        onChange={handleChange}
        value={email}
        disabled={loading}
        fullWidth
        sx={{ marginBottom: "1rem" }}
      />
      <Button
        size="large"
        fullWidth
        variant="contained"
        disabled={!email || loading}
        onClick={requestPasswordReset}
      >
        Reset password
      </Button>
    </Box>
  );
};

export default PasswordReset;
