import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";

const Banner: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const theme = useTheme();
  const hideMenu = useMediaQuery(theme.breakpoints.up("sm"));
  const navigate = useNavigate();

  const logout = () => {
    //sign user out and return to login page
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dinner Draft
        </Typography>

        {hideMenu ? (
          <>
            <Button
              startIcon={<HomeIcon />}
              onClick={() => navigate("/")}
              color="inherit"
            >
              Home
            </Button>
            <Button
              startIcon={<FavoriteIcon />}
              onClick={() => navigate("/favorite")}
              color="inherit"
              sx={{ margin: "0 1rem" }}
            >
              Favorites
            </Button>
            <Button
              startIcon={<LogoutIcon />}
              onClick={() => logout()}
              color="inherit"
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setShowMenu(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor={"top"}
              open={showMenu}
              onClose={() => setShowMenu(false)}
            >
              <List>
                <ListItemButton onClick={() => navigate("/")}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home"></ListItemText>
                </ListItemButton>
                <ListItemButton onClick={() => navigate("/favorite")}>
                  <ListItemIcon>
                    <FavoriteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Favorites"></ListItemText>
                </ListItemButton>
                <ListItemButton onClick={() => logout()}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout"></ListItemText>
                </ListItemButton>
              </List>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Banner;
