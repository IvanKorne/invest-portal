import {
  gridTemplateLargeScreens,
  gridTemplateSmallScreens,
} from "@/constants";
import { useTheme, Box, useMediaQuery } from "@mui/material";
import Row3 from "./Row3";
import Row2 from "./Row2";
import Row1 from "./Row1";

const Dashboard = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1200px)");
  const { palette } = useTheme();
  return (
    <Box
      color={palette.grey[300]}
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateAreas: gridTemplateLargeScreens,
              gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
              gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
            }
          : {
              gridTemplateAreas: gridTemplateSmallScreens,
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
            }
      }
    >
      <Row1 />
      <Row2 />
      <Row3 />
    </Box>
  );
};

export default Dashboard;
