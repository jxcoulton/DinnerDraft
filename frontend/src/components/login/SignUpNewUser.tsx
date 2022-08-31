import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../context/userData";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { TextField, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const SignUpNewUser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const { setShowAlert } = useContext(UserDataContext);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const signUpNewUserFunc = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        setShowAlert({
          show: true,
          severity: "error",
          message: `${error.message}`,
        });
      });
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
      <form>
        <TextField
          label="Email"
          onChange={handleChangeEmail}
          name="email"
          value={email}
          disabled={loading}
          fullWidth
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Password"
          onChange={handleChangePassword}
          name="password"
          value={password}
          type="password"
          disabled={loading}
          fullWidth
          sx={{ marginBottom: "1rem" }}
        />
        <LoadingButton
          size="large"
          fullWidth
          type="submit"
          variant="contained"
          onClick={signUpNewUserFunc}
          disabled={!email || !password}
          loading={loading}
        >
          Sign up
        </LoadingButton>
      </form>
    </Box>
  );
};

export default SignUpNewUser;
