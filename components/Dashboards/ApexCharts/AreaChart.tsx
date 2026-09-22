"use client";

import React from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

const AreaChart = () => {
    const series = [
        {
            name: "Solar",
            data: [42, 48, 51, 39, 55, 60, 58, 44, 50, 63, 66, 59, 52, 57],
        },
        {
            name: "Wind",
            data: [28, 35, 22, 41, 33, 26, 38, 45, 31, 24, 36, 42, 29, 34],
        },
    ];

    const options: ApexOptions = {
        chart: {
            height: 320,
            type: "area",
        },

        dataLabels: {
            enabled: false,
        },

        stroke: {
            curve: "smooth",
        },

        title: {
            text: "Renewable Energy Generation",
            align: "left",
        },

        xaxis: {
            type: "datetime",
            categories: [
                "2025-06-01",
                "2025-06-02",
                "2025-06-03",
                "2025-06-04",
                "2025-06-05",
                "2025-06-06",
                "2025-06-07",
                "2025-06-08",
                "2025-06-09",
                "2025-06-10",
                "2025-06-11",
                "2025-06-12",
                "2025-06-13",
                "2025-06-14",
            ],
        },

        yaxis: {
            labels: {
                formatter: (val: number) => {
                    return `${val} GWh`;
                },
            },
        },

        tooltip: {
            x: {
                format: "dd MMM yyyy",
            },
        },
    };

    return (
        <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={320}
        />
    );
};

export default AreaChart;