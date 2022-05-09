import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { auth, database } from "../../config/firebase";
import Center from "../utils/Center";
// import { ref, set, get, child, push, update } from "firebase/database";

const SignInExisting = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const signInExistingUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;

        // set(ref(database, 'users/' + user.uid), {
        //   email: user.email,
        // });
        //overwrites existing data on the table

        // const dbRef = ref(database)
        // get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
        //   if (snapshot.exists()) {
        //     console.log(snapshot.val());
        //   } else {
        //     console.log("No data available");
        //   }
        // }).catch((error) => {
        //   console.error(error);
        // });
        //get data from table

        // update(ref(database, "users/" + user.uid), { email: user.email })
        //   .then(() => {
        //     console.log('data sent');
        //   })
        //   .catch((error) => {
        //     console.log("error");
        //   });
        //update data on the table

        navigate("/");
      })
      .catch((error) => {
        setErrorMessage(error.code + ": " + error.message);
        console.log("user not found"); //TODO
      });
  };

  return (
    <Center height={"auto"}>
      <TextField
        label="email"
        name="email"
        value={email}
        onChange={handleChangeEmail}
      />
      <TextField
        label="password"
        name="password"
        type="password"
        value={password}
        onChange={handleChangePassword}
      />
      <Button
        size="large"
        variant="contained"
        onClick={signInExistingUser}
        disabled={!email || !password}
      >
        Login
      </Button>
      <Typography sx={{ mt: 2 }} color={"red"}>
        {errorMessage}
      </Typography>
    </Center>
  );
};

export default SignInExisting;
