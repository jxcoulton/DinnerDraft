import { useState } from "react";
import Center from "../../utils/Center";
import Planner from "../tabs/Planner";
import Banner from "../Banner";
import Favorites from "../tabs/Favorites";
import { Tabs, Tab } from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import { Box } from "@mui/system";

const Home = () => {
  const [value, setValue] = useState("1");

  function handleChange(_: any, newValue: string) {
    setValue(newValue);
  }

  return (
    <>
      <Center height={"auto"}>
        <Banner />
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
      </Center>
    </>
  );
};

export default Home;
