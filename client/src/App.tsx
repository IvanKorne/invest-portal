import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./constants";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./pages/navbar";
import Dashboard from "./pages/dashboard";
import Predictions from "./pages/predictions";

const App = () => {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <Box className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box height="100%" width="100%" padding="1rem 2rem 4rem 2rem ">
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/predictions" element={<Predictions />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </Box>
  );
};

export default App;
