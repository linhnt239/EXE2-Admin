import * as React from 'react';

import dynamic from 'next/dynamic';

// import ReactApexChart from 'react-apexcharts';
import { formatNumber } from '@/core/utils/number.helper';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ColumnChartBasicProps {
    values: {
        name: string;
        data: number;
    }[];
    unit: string;
    title: string;
    colors: string[];
    isLoading?: boolean;
}

const ColumnChartBasic: React.FC<ColumnChartBasicProps> = ({ title, values, unit, colors, isLoading }) => {
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="fade-in">
            <ReactApexChart
                options={{
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: '5%',
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        show: true,
                        width: 2,
                        colors: ["'transparent'"],
                    },
                    xaxis: {
                        categories: values.map((item) => item.name),
                    },
                    yaxis: {
                        title: {
                            text: unit,
                        },
                    },
                    title: {
                        text: title,
                        align: 'left',
                    },
                    fill: {
                        opacity: 1,
                    },
                    tooltip: {
                        y: {
                            formatter: function (val) {
                                return formatNumber(val) + ' ' + unit;
                            },
                        },
                    },
                    colors: colors,
                }}
                series={[
                    {
                        name: unit,
                        data: values.map((item) => item.data),
                    },
                ]}
                type="bar"
                height={350}
                width={'100%'}
            />
        </div>
    );
};

export default ColumnChartBasic;
