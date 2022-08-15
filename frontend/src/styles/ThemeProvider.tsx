import { Theme } from "@mui/material";
import { createTheme, PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    palette: {
      primary: {
        main: string;
        dark: string;
      };
      secondary: {
        main: string;
      };
      grey: {
        [key: number]: string;
      };
      text: {
        primary: string;
      };
      background: {
        default: string;
      };
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    palette?: PaletteOptions;
  }
}

//default theme to ref palette
const colorTheme = createTheme({
  palette: {
    primary: {
      main: "#9eba4d",
    },
    secondary: {
      main: "#f29366",
    },
  },
});

//provider palette / component styles
const theme: Theme = createTheme({
  palette: {
    primary: {
      main: colorTheme.palette.primary.main,
    },
    secondary: {
      main: colorTheme.palette.secondary.main,
    },
  },
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0,0,0,0.25)",
        },
      },
    },
  },
});

export default theme;
