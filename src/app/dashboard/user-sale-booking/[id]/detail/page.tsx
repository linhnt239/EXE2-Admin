'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { serviceCategoryApi } from '@/core/api/service-category.api';
import { userSaleBookingApi } from '@/core/api/user-sale-booking.api';
import FieldBuilder from '@/core/components/field/FieldBuilder';
import { FieldType } from '@/core/components/field/FieldDisplay';
import { UserSaleBooking } from '@/core/models/userSaleBooking';
import { mapListToOptions } from '@/core/utils/api.helper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const id = _get(params, 'id') as string;

    const userSaleBooking = useQuery(
        ['userSaleBooking', id],
        () => {
            return userSaleBookingApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );

    return (
        <div className="">
            <FieldBuilder<UserSaleBooking>
                fields={[
                    {
                        label: 'ID',
                        key: 'id',
                        type: FieldType.UUID,
                        span: 1,
                    },
                    {
                        label: 'Name',
                        key: 'name',
                        type: FieldType.TEXT,
                        span: 1,
                    },
                    {
                        label: 'Price',
                        key: 'price',
                        type: FieldType.NUMBER,
                        span: 1,
                    },
                    {
                        label: 'Owner',
                        key: '',
                        type: FieldType.LINK,
                        span: 3,
                        apiAction: async (userSaleBooking: UserSaleBooking) => {
                            return {
                                link: NKRouter.user.user.detail(userSaleBooking.user.id),
                                label: userSaleBooking.user.name,
                            };
                        },
                    },
                    {
                        label: 'Description',
                        key: 'description',
                        type: FieldType.RICH_TEXT,
                        span: 3,
                    },
                    {
                        label: 'Note',
                        key: 'note',
                        type: FieldType.MULTILINE_TEXT,
                        span: 3,
                    },
                    {
                        key: 'serviceCategory.id',
                        label: 'Service Category',
                        type: FieldType.BADGE_API,
                        apiAction: async () => mapListToOptions(await serviceCategoryApi.v1Select('', true)),
                        span: 1,
                    },
                    {
                        key: 'status',
                        label: 'Status',
                        type: FieldType.BADGE_API,
                        apiAction: userSaleBookingApi.v1GetEnumStatus,
                        span: 2,
                    },
                    {
                        label: 'Image',
                        key: 'imageUrls',
                        type: FieldType.MULTIPLE_IMAGES,
                        span: 3,
                    },
                    {
                        label: 'Create At',
                        key: 'createAt',
                        type: FieldType.TIME_FULL,
                        span: 3,
                    },
                    {
                        label: 'Update At',
                        key: 'updateAt',
                        type: FieldType.TIME_FULL,
                        span: 3,
                    },
                    {
                        label: 'Is Deleted',
                        key: 'isDeleted',
                        type: FieldType.BOOLEAN,
                        span: 3,
                    },
                ]}
                extra={
                    <div className="flex items-center gap-4">
                        <Link href={NKRouter.userSaleBooking.edit(id)}>
                            <Button>Edit</Button>
                        </Link>
                    </div>
                }
                isFetching={userSaleBooking.isFetching}
                record={userSaleBooking.data}
                title="User Sale Booking Detail"
            />
        </div>
    );
};

export default Page;
