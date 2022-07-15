import React from "react";
import { useNavigate } from "react-router-dom";
import SignInGoogle from "../auth/SignInGoogle";
import SignUpNewUser from "../auth/SignUpNewUser";
import SignInExisting from "../auth/SignInExisting";
import Center from "../utils/Center";
import { Box, Tab, Tabs, Button } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";

const Login = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState("1");

  function handleChange(event: React.SyntheticEvent, newValue: string) {
    setValue(newValue);
  }

  function handleReset() {
    navigate("/reset");
  }

  return (
    <Center height={90}>
      <TabContext value={value}>
        <Box
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          boxShadow={2}
          margin={3}
          paddingBottom={2}
          sx={{ backgroundColor: "white" }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
            <Tabs value={value} onChange={handleChange} variant="fullWidth">
              <Tab sx={{ px: { lg: 20, xs: 6 } }} label="Login" value={"1"} />
              <Tab
                sx={{ px: { lg: 16, xs: 6 } }}
                label="Register"
                value={"2"}
              />
            </Tabs>
          </Box>
          {/* login */}
          <TabPanel value={"1"}>
            <SignInExisting />
          </TabPanel>
          {/* register */}
          <TabPanel value={"2"}>
            <SignUpNewUser />
          </TabPanel>
          <SignInGoogle />
          <Button size="large" variant="contained" onClick={handleReset}>
            forgot password?
          </Button>
        </Box>
      </TabContext>
    </Center>
  );
};

export default Login;
