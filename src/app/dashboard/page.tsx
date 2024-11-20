'use client';

import * as React from 'react';

import { useQuery } from '@tanstack/react-query';
import { Computing, Money, PaperAirplane, Person } from 'akar-icons';
import axios from 'axios';

import { chatMessageApi } from '@/core/api/chat-message.api';
import { userGroupApi } from '@/core/api/user-group.api';
import { userPostApi } from '@/core/api/user-post.api';
import { userSaleBookingOrderApi } from '@/core/api/user-sale-booking-order.api';
import { userSaleBookingApi } from '@/core/api/user-sale-booking.api';
import { userSaleApi } from '@/core/api/user-sale.api';
import { userSubscriptionApi } from '@/core/api/user-subscription.api';
import { userWalletTransactionApi } from '@/core/api/user-wallet-transaction.api';
import { userApi } from '@/core/api/user.api';
import ChartBasicArea from '@/core/components/chart/ChartBasicArea';
import ColumnChartBasic from '@/core/components/chart/ColumnChatBasic';
import NKChartLabel from '@/core/components/chart/NKChartLabel';
import { FilterComparator } from '@/core/models/common';
import { HKMoment } from '@/core/utils/moment';
import { groupCountValueByDate, groupSumValueByDate } from '@/core/utils/report.helper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const userReport = useQuery(
        ['user-report'],
        async () => {
            const res = await userApi.v1GetReport({
                filters: [],
                valuePath: 'createdAt',
            });

            return groupCountValueByDate(res);
        },
        {
            initialData: {},
        },
    );

    const userSaleReport = useQuery(
        ['user-sale-report'],
        async () => {
            const res = await userSaleApi.v1GetReport({
                filters: [],
                valuePath: 'createdAt',
            });

            return groupCountValueByDate(res);
        },
        {
            initialData: {},
        },
    );

    const userPostReport = useQuery(
        ['user-post-report'],
        async () => {
            const res = await userPostApi.v1GetReport({
                filters: [],
                valuePath: 'createdAt',
            });

            return groupCountValueByDate(res);
        },
        {
            initialData: {},
        },
    );

    const userWalletTransactionServiceReport = useQuery(
        ['user-wallet-transaction-report'],
        async () => {
            const res = await userWalletTransactionApi.v1GetReport({
                filters: [`type||${FilterComparator.EQUAL}||${'SERVICE'}`],
                valuePath: 'amount',
            });

            return groupSumValueByDate(res);
        },
        {
            initialData: {},
        },
    );

    const userWalletTransactionBookingReport = useQuery(
        ['user-wallet-transaction-booking-report'],
        async () => {
            const res = await userWalletTransactionApi.v1GetReport({
                filters: [`type||${FilterComparator.EQUAL}||${'BOOKING'}`],
                valuePath: 'amount',
            });

            return groupSumValueByDate(res);
        },
        {
            initialData: {},
        },
    );

    const todayUserWalletServiceTransactionReport = useQuery(
        ['today-user-wallet-transaction-report'],
        async () => {
            const start = new Date();
            start.setDate(start.getDate() - 1);

            start.setHours(0, 0, 0, 0);

            const res = await userWalletTransactionApi.v1GetReport({
                filters: [
                    `createdAt||${FilterComparator.GREATER_THAN_OR_EQUAL}||${HKMoment.formatFilter(start)}`,
                    `type||${FilterComparator.IN}||${'SERVICE'}`,
                ],
                valuePath: 'amount',
            });

            return res.reduce((acc, cur) => acc + cur.value, 0);
        },
        {
            initialData: 0,
        },
    );

    const userSaleBookingOrderReport = useQuery(
        ['user-sale-booking-order-report'],
        async () => {
            const res = await userSaleBookingOrderApi.v1GetReport({
                filters: [],
                valuePath: 'createdAt',
            });

            return groupCountValueByDate(res);
        },
        {
            initialData: {},
        },
    );

    const todayUserPost = useQuery(
        ['today-user-post'],
        async () => {
            const start = new Date();
            start.setDate(start.getDate() - 1);

            start.setHours(0, 0, 0, 0);

            const res = await userPostApi.v1GetReport({
                filters: [`createdAt||${FilterComparator.GREATER_THAN_OR_EQUAL}||${HKMoment.formatFilter(start)}`],
                valuePath: 'createdAt',
            });

            return res.length;
        },
        {
            initialData: 0,
        },
    );

    const todaySaleBooking = useQuery(
        ['today-sale-booking'],
        async () => {
            const start = new Date();
            start.setDate(start.getDate() - 1);

            start.setHours(0, 0, 0, 0);

            const res = await userSaleBookingApi.v1GetReport({
                filters: [`createdAt||${FilterComparator.GREATER_THAN_OR_EQUAL}||${HKMoment.formatFilter(start)}`],
                valuePath: 'createdAt',
            });

            return res.length;
        },
        {
            initialData: 0,
        },
    );

    const todaySaleBookingOrder = useQuery(
        ['today-sale-booking-order'],
        async () => {
            const start = new Date();
            start.setDate(start.getDate() - 1);

            start.setHours(0, 0, 0, 0);

            const res = await userSaleBookingOrderApi.v1GetReport({
                filters: [`createdAt||${FilterComparator.GREATER_THAN_OR_EQUAL}||${HKMoment.formatFilter(start)}`],
                valuePath: 'createdAt',
            });

            return res.length;
        },
        {
            initialData: 0,
        },
    );

    return (
        <div className="grid grid-cols-2 gap-10">
            <div className="col-span-2 grid grid-cols-4 gap-8">
                <NKChartLabel
                    label="Today Income"
                    value={todayUserWalletServiceTransactionReport.data}
                    color="yellow"
                    precision={0}
                    suffix={<span>VND</span>}
                    prefix={<Money strokeWidth={2} size={24} />}
                />
                <NKChartLabel
                    label="Today Forum Post"
                    value={todayUserPost.data}
                    color="green"
                    precision={0}
                    prefix={<Person strokeWidth={2} size={24} />}
                />

                <NKChartLabel
                    label="Today New Service"
                    value={todaySaleBooking.data}
                    color="blue"
                    precision={0}
                    prefix={<Computing strokeWidth={2} size={24} />}
                />
                <NKChartLabel
                    label="Today Booking Service"
                    value={todaySaleBookingOrder.data}
                    color="indigo"
                    precision={0}
                    prefix={<Computing strokeWidth={2} size={24} />}
                />
            </div>
            <div>
                <ColumnChartBasic
                    title="Income Report"
                    unit="VND"
                    colors={['#e67e22']}
                    values={Object.keys(userWalletTransactionServiceReport.data).map((key) => {
                        return {
                            name: key,
                            data: userWalletTransactionServiceReport.data[key],
                        };
                    })}
                    isLoading={userWalletTransactionServiceReport.isLoading}
                />
                <ChartBasicArea
                    title="New User Report"
                    unit="User"
                    colors={['#3498db']}
                    values={Object.keys(userReport.data).map((key) => {
                        return {
                            name: key,
                            data: userReport.data[key],
                        };
                    })}
                />
            </div>

            <div>
                <ChartBasicArea
                    title="Forum Post Report"
                    unit="Post"
                    colors={['#e74c3c']}
                    values={Object.keys(userPostReport.data).map((key) => {
                        return {
                            name: key,
                            data: userPostReport.data[key],
                        };
                    })}
                />
                <ChartBasicArea
                    title="Freelance Booking Report"
                    unit="Booking"
                    colors={['#34495e']}
                    values={Object.keys(userSaleBookingOrderReport.data).map((key) => {
                        return {
                            name: key,
                            data: userSaleBookingOrderReport.data[key],
                        };
                    })}
                />
            </div>
        </div>
    );
};

export default Page;
