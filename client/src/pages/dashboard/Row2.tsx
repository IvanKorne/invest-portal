import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

const Row2 = () => {
  const { data: products } = useGetProductsQuery();
  const { data: kpis } = useGetKpisQuery();
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];

  const pieData = [
    { name: "Group A", value: 600 },
    { name: "Group B", value: 400 },
  ];

  const operationalExpenses = useMemo(() => {
    return (
      kpis &&
      kpis[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            "Operational Expenses": operationalExpenses,
            "Non Operational Expenses": nonOperationalExpenses,
          };
        }
      )
    );
  }, [kpis]);

  const productExpenseData = useMemo(() => {
    return (
      products &&
      products.map(({ _id, price, expense }) => {
        return {
          id: _id,
          price,
          expense,
        };
      })
    );
  }, [products]);

  return (
    <>
      <DashboardBox bgcolor="#fff" gridArea="d">
        <BoxHeader title="Operational vs Non-Operational Expenses" />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={operationalExpenses}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 45,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Non Operational Expenses"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.primary.main[500]}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox bgcolor="#fff" gridArea="e">
        <BoxHeader title="Campaigns and Targets" />
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}
          >
            <Pie
              stroke="none"
              data={pieData}
              innerRadius={20}
              outerRadius={40}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis={"40%"} textAlign="center">
            <Typography variant="h5">Target Sales</Typography>
            <Typography variant="h3" m="0.3rem 0" color={palette.primary[300]}>
              83
            </Typography>
            <Typography variant="h6">
              Financial goals of the campaign
            </Typography>
          </Box>
          <Box flexBasis={"40%"}>
            <Typography variant="h5">Losses in Revenue</Typography>
            <Typography variant="h6">Losses are down 25%</Typography>
            <Typography variant="h5" mt="0.5rem">
              Profit Margins
            </Typography>
            <Typography variant="h6">Margins are up 30%</Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox bgcolor="#fff" gridArea="f">
        <BoxHeader title="Product Prices vs Expenses" />
        <ResponsiveContainer width="100%" height={"100%"}>
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -10,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type="number" range={[20]} />
            <Tooltip formatter={(v) => `$${v}`} />
            <Scatter
              name="Product Expense Ration"
              data={productExpenseData}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;
