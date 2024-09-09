import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./constants";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./pages/navbar";

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
              <Route path="/" element={<div>Dashboard Page</div>} />
              <Route
                path="/predictions"
                element={<div>Predictions Page</div>}
              />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </Box>
  );
};

export default App;
