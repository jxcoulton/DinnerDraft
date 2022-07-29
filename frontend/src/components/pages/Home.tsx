import { useState } from "react";
import Planner from "../tabs/Planner";
import Favorites from "../tabs/Favorites";
import { Tabs, Tab } from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import { Box } from "@mui/system";
import LogoutButton from "../buttons/LogoutButton";

const Home = () => {
  const [value, setValue] = useState("1");

  function handleChange(_: any, newValue: string) {
    setValue(newValue);
  }

  return (
    <>
      <LogoutButton />
      <TabContext value={value}>
        <Tabs
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons="auto"
          value={value}
        >
          <Tab label="Planner" value="1" />
          <Tab label="Favorites" value="2" />
        </Tabs>
        <Box>
          <TabPanel value="1">
            <Planner />
          </TabPanel>
          <TabPanel value="2">
            <Favorites />
          </TabPanel>
        </Box>
      </TabContext>
    </>
  );
};

export default Home;
