import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Label,
} from "recharts";
import regression, { DataPoint } from "regression";

const Predictions = () => {
  const { palette } = useTheme();
  const [isPredictions, setIsPredictions] = useState(false);
  const { data: kpis } = useGetKpisQuery();

  const formattedData = useMemo(() => {
    if (!kpis) return [];
    const monthData = kpis[0].monthlyData;

    const formatted: Array<DataPoint> = monthData.map(({ revenue }, i) => {
      return [i, revenue];
    });
    const regressionLine = regression.linear(formatted);

    return monthData.map(({ month, revenue }, i) => {
      return {
        name: month,
        revenueLine: revenue,
        regressionLine: regressionLine.points[i][1], //Grabs the point for the specfic month
        predictionLine: regressionLine.predict(i + 12)[1], //Grabs the predicted point for the specfic month, next year
      };
    });
  }, [kpis]);
  return (
    <DashboardBox height={"100%"} width={"100%"} p="1rem" overflow={"hidden"}>
      <FlexBetween m="1rem 2.5rem">
        <Box>
          <Typography variant="h3">Revenue Predeictions</Typography>
          <Typography variant="h6">
            Predicted revenue based on a simple linear regression model
          </Typography>
        </Box>
        <Button
          onClick={() => {
            setIsPredictions(!isPredictions);
          }}
          sx={{
            color: palette.grey[900],
            backgroundColor: palette.grey[700],
            boxShadow: "0.1rem rgba(0,0,0,.4)",
          }}
        >
          {" "}
          Show Predicted Revenue for Next Year
        </Button>
      </FlexBetween>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid stroke={palette.grey[800]} strokeDasharray={"3 3"} />
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }}>
            <Label value={"Month"} offset={-5} position={"insideBottom"} />
          </XAxis>
          <YAxis
            axisLine={{ strokeWidth: "0" }}
            tickFormatter={(v) => `$${v}`}
            style={{ fontSize: "10px" }}
            domain={[12000, 26000]}
          >
            <Label
              value={"Revenue in USD"}
              offset={-5}
              angle={-90}
              position={"insideLeft"}
            />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="revenueLine"
            stroke={palette.primary.main}
            strokeWidth={0}
            dot={{ strokeWidth: 5 }}
          />
          <Line
            type="monotone"
            dataKey="regressionLine"
            stroke={palette.tertiary[500]}
            dot={false}
          />
          {isPredictions ? (
            <Line
              strokeDasharray={"5 5"}
              dataKey="predictionLine"
              stroke={palette.secondary[500]}
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};

export default Predictions;
