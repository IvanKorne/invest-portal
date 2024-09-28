import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";

const Row3 = () => {
  const { data: transactions } = useGetTransactionsQuery();
  const { data: products } = useGetProductsQuery();
  const { data: kpis } = useGetKpisQuery();
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];

  console.log(kpis);

  const pieChartData = useMemo(() => {
    if (kpis) {
      const totalExpenses = kpis[0].totalExpenses;
      return Object.entries(kpis[0].expensesByCategory)
        .filter(([key]) => key !== "$*")
        .map(([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            },
          ];
        });
    }
  }, [kpis]);
  const productColumns = [
    { field: "_id", headerName: "id", flex: 1 },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

  const transactionsColumns = [
    { field: "_id", headerName: "id", flex: 1 },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.66,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: (params: GridCellParams) =>
        `${(params.value as string[]).length}`,
    },
  ];

  return (
    <>
      <DashboardBox bgcolor="#fff" gridArea="g">
        <BoxHeader
          title="List of Products"
          sidetext={`${products?.length} products`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            rows={products || []}
            columns={productColumns}
            hideFooter={true}
            rowHeight={35}
            columnHeaderHeight={25}
          />
        </Box>
      </DashboardBox>
      <DashboardBox bgcolor="#fff" gridArea="h">
        <BoxHeader
          title="Recent Orders"
          sidetext={`${transactions?.length} lastest transactions`}
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            rows={transactions || []}
            columns={transactionsColumns}
            hideFooter={true}
            rowHeight={35}
            columnHeaderHeight={25}
          />
        </Box>
      </DashboardBox>
      <DashboardBox bgcolor="#fff" gridArea="i">
        <BoxHeader title="Expense Breakdown by Category" sidetext="4%" />
        <FlexBetween gap="0.5rem" px="1rem" textAlign={"center"}>
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={100}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={38}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>
      <DashboardBox bgcolor="#fff" gridArea="j">
        <BoxHeader
          title="Overall Summary and Explanation Data"
          sidetext="+15%"
        />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="40%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6" textAlign={"center"}>
          Expenses remain well within budget limits, with the bulk allocated to
          operational costs such as salaries, services, and supplies. We are
          maintaining a healthy balance between growth investment and
          operational efficiency.
        </Typography>
      </DashboardBox>
    </>
  );
};

export default Row3;
