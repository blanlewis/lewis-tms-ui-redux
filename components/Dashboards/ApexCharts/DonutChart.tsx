"use client";

import React from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

const DonutChart = () => {
    const series = [54, 41, 38, 16, 12];

    const options: ApexOptions = {
        chart: {
            width: 480,
            type: "donut",
        },

        labels: [
            "North America",
            "Europe",
            "Asia Pacific",
            "Latin America",
            "Middle East",
        ],

        title: {
            text: "Revenue by Region ($M)",
            align: "center",
        },

        legend: {
            show: false,
        },

        plotOptions: {
            pie: {
                dataLabels: {
                    offset: 0,
                },
            },
        },

        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 320,
                    },
                },
            },
        ],
    };

    return (
        <ReactApexChart
            options={options}
            series={series}
            type="donut"
            width={480}
        />
    );
};

export default DonutChart;