import { Theme } from "@mui/material";
import { createTheme, PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    palette: {
      primary: {
        main: string;
      };
      secondary: {
        main: string;
      };
      grey: {
        [key: number]: string;
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
      main: "#40843A",
    },
    secondary: {
      main: "#C22828",
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
    MuiCard: {
      styleOverrides: {
        root: {
          padding: "15px",
          margin: "10px",
          backgroundColor: colorTheme.palette.grey[100],
          height: "90%",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInput-underline:after": {
            borderBottomColor: colorTheme.palette.secondary.main,
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: colorTheme.palette.secondary.main,
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: colorTheme.palette.secondary.main,
            },
          },
          input: { textTransform: "capitalize" },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        input: {
          textTransform: "capitalize",
        },
      },
    },
  },
});

export default theme;
