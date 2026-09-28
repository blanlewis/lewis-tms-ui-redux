"use client";

import {useState} from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

const BarChart = () => {
    const [state] = useState<{
        series: {
            name: string;
            data: number[];
        }[];
        options: ApexOptions;
    }>({
        series: [
            {
                name: "Spend",
                data: [18, 42, 55, 33, 21, 14, 9],
            },
            {
                name: "Revenue",
                data: [64, 96, 138, 71, 52, 88, 130],
            },
        ],

        options: {
            chart: {
                type: "bar",
                height: 320,
            },

            plotOptions: {
                bar: {
                    horizontal: true,
                    dataLabels: {
                        position: "top",
                    },
                },
            },

            dataLabels: {
                enabled: false,
            },

            stroke: {
                show: true,
                width: 1,
                colors: ["#fff"],
            },

            grid: {
                padding: {
                    right: 30,
                },
            },

            tooltip: {
                shared: true,
                intersect: false,
            },

            title: {
                text: "Marketing Spend vs Revenue by Channel",
                align: "left",
            },

            xaxis: {
                categories: [
                    "Email",
                    "Social",
                    "Search",
                    "Display",
                    "Affiliate",
                    "Referral",
                    "Direct",
                ],

                labels: {
                    formatter: (val: string) => {
                        return "$" + Math.round(Number(val)) + "k";
                    },
                },
            },
        },
    });

    return (
        <div>
            <ReactApexChart
                options={state.options}
                series={state.series}
                type="bar"
                height={320}
            />
        </div>
    );
};

export default BarChart;