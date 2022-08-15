import { useState, useContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { PublicVariablesContext } from "../../context/PublicVariables";
import { auth } from "../../config/firebase";
import { TextField, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const SignUpNewUser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const { setShowAlert } = useContext(PublicVariablesContext);

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
      display={"flex"}
      alignItems={"center"}
      flexDirection={"column"}
      width={"50%"}
    >
      <TextField
        label="Email"
        fullWidth
        name="Email"
        value={email}
        onChange={handleChangeEmail}
        sx={{ marginBottom: "1rem" }}
        disabled={loading}
      />
      <TextField
        fullWidth
        label="Password"
        name="Password"
        type="password"
        value={password}
        onChange={handleChangePassword}
        sx={{ marginBottom: "1rem" }}
        disabled={loading}
      />
      <LoadingButton
        size="large"
        fullWidth
        variant="contained"
        onClick={signUpNewUserFunc}
        disabled={!email || !password}
        loading={loading}
      >
        Sign up
      </LoadingButton>
    </Box>
  );
};

export default SignUpNewUser;
