import { useState } from "react";
import Planner from "../tabs/Planner";
import Favorites from "../tabs/Favorites";
import { Tabs, Tab, useTheme, Theme } from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import { Box } from "@mui/system";
import LogoutButton from "../buttons/LogoutButton";
import styled from "@emotion/styled";

// type StyleProps = {
//   theme: Theme;
// };

// const StyledTabs = styled(Tabs)(({ theme }: StyleProps) => ({
//   backgroundColor: theme.palette.primary.main,
//   ".MuiTabs-indicator": {
//     backgroundColor: theme.palette.secondary.main,
//   },
// }));

// const StyledTab = styled(Tab)(({ theme }: StyleProps) => ({
//   marginRight: "2px",
//   marginLeft: "2px",
//   borderRadius: "10px 10px 0px 0px",
//   backgroundColor: theme.palette?.grey[300],
//   color: theme.palette.grey[500],
//   "&.Mui-selected": {
//     backgroundColor: theme.palette.grey[50],
//     color: theme.palette.secondary.main,
//   },
// }));

const Home = () => {
  // const [value, setValue] = useState("1");
  // const theme = useTheme();

  // function handleChange(_: any, newValue: string) {
  //   setValue(newValue);
  // }

  return (
    <>
      {/* <TabContext value={value}>
      <StyledTabs
        onChange={handleChange}
        variant="fullWidth"
        value={value}
        theme={theme}
      >
        <StyledTab label="Planner" value="1" theme={theme} />
        <StyledTab label="Favorites" value="2" theme={theme} />
        <LogoutButton />
      </StyledTabs>
      <Box>
        <TabPanel value="1" sx={{ backgroundColor: theme.palette.grey[50] }}> */}
      <Planner />
      {/* </TabPanel>
        <TabPanel value="2" sx={{ backgroundColor: theme.palette.grey[50] }}> */}
      <Favorites />
      {/* </TabPanel>
      </Box>
      </TabContext> */}
    </>
  );
};

export default Home;
