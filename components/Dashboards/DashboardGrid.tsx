"use client";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { BarChart, AreaChart, DonutChart } from "@/components/Dashboards/ApexCharts";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: (theme.vars ?? theme).palette.text.secondary,

    ...theme.applyStyles("dark", {
        backgroundColor: "#1A2027",
    }),
}));

const DashboardGrid = () => {
    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <Item>
                    <AreaChart />
                </Item>
            </Grid>

            <Grid size={12}>
                <Item>
                    <BarChart />
                </Item>
            </Grid>
        </Grid>
    );
};

export default DashboardGrid;