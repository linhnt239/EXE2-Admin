import * as React from 'react';

import dynamic from 'next/dynamic';

// import ReactApexChart from 'react-apexcharts';
import { formatNumber } from '@/core/utils/number.helper';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartBasicAreaProps {
    values: {
        name: string;
        data: number;
    }[];
    unit: string;
    title: string;
    colors: string[];
}

const ChartBasicArea: React.FC<ChartBasicAreaProps> = ({ title, values, unit, colors }) => {
    return (
        <div>
            <ReactApexChart
                options={{
                    chart: {
                        zoom: {
                            enabled: false,
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        curve: 'straight',
                    },

                    title: {
                        text: title,
                        align: 'left',
                    },
                    labels: values.map((item) => item.name),
                    xaxis: {
                        labels: {
                            formatter: (value: any) => {
                                return value;
                            },
                        },
                    },
                    yaxis: {
                        labels: {
                            formatter: (value: any) => {
                                return formatNumber(value);
                            },
                        },
                    },
                    legend: {
                        horizontalAlign: 'left',
                    },
                    colors: colors,
                }}
                series={[
                    {
                        name: unit,
                        data: values.map((item) => item.data),
                    },
                ]}
                type="area"
                width={'100%'}
                height={350}
            />
        </div>
    );
};

export default ChartBasicArea;
