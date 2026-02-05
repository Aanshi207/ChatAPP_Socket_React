import { createTheme } from "@mui/material/styles";

const colors = {
  primary: "#3BC9C9",
  secondary: "#547792",
  light: "#d4e9e9",
  lightAccent: "#b0d4d4",
  darkBg: "#020617",
  lightBg: "#f8fafc",
  white: "#ffffff",
};

/* ---------- LIGHT THEME ---------- */
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.primary,
      light: colors.light,
      dark: colors.secondary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: colors.lightBg,
      paper: colors.white,
    },
    text: {
      primary: "#0f172a",
      secondary: "#475569",
      tertiary: "#999999",
    },
    success: {
      main: colors.primary,
    },
    divider: "rgba(0, 0, 0, 0.12)",
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: "2.5rem", fontWeight: 600 },
    h2: { fontSize: "2rem", fontWeight: 600 },
    h3: { fontSize: "1.75rem", fontWeight: 600 },
    h4: { fontSize: "1.5rem", fontWeight: 600 },
    h5: { fontSize: "1.25rem", fontWeight: 500 },
    h6: { fontSize: "1rem", fontWeight: 500 },
    body1: { fontSize: "0.95rem", lineHeight: 1.5 },
    body2: { fontSize: "0.875rem", lineHeight: 1.4 },
    caption: { fontSize: "0.75rem" },
  },
  shape: {
    borderRadius: 10,
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.lightBg,
          color: "#0f172a",
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        },
        "*": {
          boxSizing: "border-box",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          transition: "all 0.3s ease",
        },
        contained: {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.16)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: "all 0.3s ease",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            transition: "all 0.3s ease",
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
});

/* ---------- DARK THEME ---------- */
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#8DBCC7",
      light: colors.light,
      dark: colors.secondary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: colors.darkBg,
      paper: "#0f172a",
    },
    text: {
      primary: "#e5e7eb",
      secondary: "#9ca3af",
      tertiary: "#666666",
    },
    divider: "rgba(255, 255, 255, 0.12)",
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: "2.5rem", fontWeight: 600 },
    h2: { fontSize: "2rem", fontWeight: 600 },
    h3: { fontSize: "1.75rem", fontWeight: 600 },
    h4: { fontSize: "1.5rem", fontWeight: 600 },
    h5: { fontSize: "1.25rem", fontWeight: 500 },
    h6: { fontSize: "1rem", fontWeight: 500 },
    body1: { fontSize: "0.95rem", lineHeight: 1.5 },
    body2: { fontSize: "0.875rem", lineHeight: 1.4 },
    caption: { fontSize: "0.75rem" },
  },
  shape: {
    borderRadius: 10,
  },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.darkBg,
          color: "#e5e7eb",
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        },
        "*": {
          boxSizing: "border-box",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          transition: "all 0.3s ease",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
          transition: "all 0.3s ease",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          background: `linear-gradient(135deg, #8DBCC7, ${colors.secondary})`,
          fontWeight: 600,
        },
      },
    },
  },
});
