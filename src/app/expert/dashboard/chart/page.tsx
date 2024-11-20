'use client';

import * as React from 'react';

import { useQuery } from '@tanstack/react-query';
import { MusicAlbum, Paper, PeopleGroup, Person, Ticket } from 'akar-icons';
import { useSelector } from 'react-redux';

import { bookingOrderApi } from '@/core/api/booking-order.api';
import { bookingApi } from '@/core/api/booking.api';
import { musicApi } from '@/core/api/music.api';
import { userPostApi } from '@/core/api/user-post.api';
import { userApi } from '@/core/api/user.api';
import ChartBasicLine from '@/core/components/chart/ChartBasicLine';
import ChartLabel from '@/core/components/chart/ChartLabel';
import { BookingOrderStatus } from '@/core/models/bookingOrder';
import { FilterComparator } from '@/core/models/common';
import { RootState } from '@/core/store';
import { UserState } from '@/core/store/user';
import { HKMoment } from '@/core/utils/moment';
import { groupCountValueByDate, groupSumValueByDate } from '@/core/utils/report.helper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const { id } = useSelector<RootState, UserState>((state) => state.user);
    const bookingReport = useQuery(
        ['user-report', id],
        async () => {
            const res = await bookingOrderApi.v1GetReport({
                filters: [
                    // `user.id||${FilterComparator.EQUAL}||${id}`
                ],
                valuePath: 'createdAt',
            });

            return groupCountValueByDate(res);
        },
        {
            initialData: {},
            enabled: !!id,
        },
    );
    const bookingOrderReport = useQuery(
        ['booking-order-report', id],
        async () => {
            const res = await bookingOrderApi.v1GetReport({
                filters: [
                    // `status||${FilterComparator.EQUAL}||${BookingOrderStatus.COMPLETED}`, `user.id||${FilterComparator.EQUAL}||${id}`
                ],
                valuePath: 'price',
            });

            return groupSumValueByDate(res);
        },
        {
            initialData: {},
            enabled: !!id,
        },
    );
    const booking = useQuery(
        ['booking-order-today', id],
        async () => {
            const start = new Date();
            start.setDate(start.getDate() - 1);

            start.setHours(0, 0, 0, 0);

            const res = await bookingOrderApi.v1GetReport({
                filters: [
                    `createdAt||${FilterComparator.GREATER_THAN_OR_EQUAL}||${HKMoment.formatFilter(start)}`,
                    `user.id||${FilterComparator.EQUAL}||${id}`,
                ],
                valuePath: 'price',
            });

            return res.length;
        },
        {
            initialData: 0,
            enabled: !!id,
        },
    );

    return (
        <div className="grid grid-cols-2 gap-10">
            <div className="col-span-2 grid grid-cols-6 gap-8">
                <ChartLabel
                    label="Today Booking"
                    value={booking.data}
                    color={'#3f8600'}
                    precision={0}
                    prefix={<Ticket strokeWidth={2} size={24} />}
                />
            </div>
            <div>
                <ChartBasicLine
                    title="Booking Report"
                    unit="Booking"
                    values={Object.keys(bookingReport.data).map((key) => {
                        return {
                            name: key,
                            data: bookingReport.data[key],
                        };
                    })}
                />
            </div>
            <div>
                <ChartBasicLine
                    title="Booking Revenue Report"
                    unit="VND"
                    values={Object.keys(bookingOrderReport.data).map((key) => {
                        return {
                            name: key,
                            data: bookingOrderReport.data[key],
                        };
                    })}
                />
            </div>
        </div>
    );
};

export default Page;
