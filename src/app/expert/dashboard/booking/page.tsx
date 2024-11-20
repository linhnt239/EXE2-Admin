'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { EditOutlined, EyeOutlined, ImportOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Table } from 'antd';
import joi from 'joi';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { BookingOrderIV1UpdateDto, bookingOrderApi } from '@/core/api/booking-order.api';
import { bookingApi } from '@/core/api/booking.api';
import { productVariantApi } from '@/core/api/product-variant.api';
import { productApi } from '@/core/api/product.api';
import { userMeApi } from '@/core/api/user-me.api';
import { userApi } from '@/core/api/user.api';
import CTAButton from '@/core/components/cta/CTABtn';
import DrawerBuilder from '@/core/components/drawer/DrawerBuilder';
import FieldBadgeApi from '@/core/components/field/FieldBadgeApi';
import FieldBuilder from '@/core/components/field/FieldBuilder';
import { FieldType } from '@/core/components/field/FieldDisplay';
import FiledMultipleImage from '@/core/components/field/FieldMultipleImages';
import FieldMultipleText from '@/core/components/field/FieldMultipleText';
import FieldNumber from '@/core/components/field/FieldNumber';
import FieldText from '@/core/components/field/FieldText';
import FieldTime from '@/core/components/field/FieldTime';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';
import ModalBuilder from '@/core/components/modal/ModalBuilder';
import { Booking } from '@/core/models/booking';
import { BookingOrder, BookingOrderStatus } from '@/core/models/bookingOrder';
import { Product } from '@/core/models/product';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const booking = useQuery(
        ['booking'],
        async () => {
            const userMe = await userMeApi.v1Get();
            const res = await bookingApi.v1GetMeBooking();
            res.user = userMe;
            return res;
        },
        {
            refetchInterval: 4000,
        },
    );
    if (booking.isFetching) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full">
            <FieldBuilder<Booking>
                extra={
                    <div className="flex items-center gap-4">
                        <Link href={NKRouter.expert.booking.edit(booking.data?.id || '')}>
                            <Button>Edit</Button>
                        </Link>
                    </div>
                }
                fields={[
                    {
                        label: 'Name',
                        key: 'name',
                        type: FieldType.TEXT,
                        span: 1,
                    },
                    {
                        label: 'Create At',
                        key: 'createAt',
                        type: FieldType.TIME_FULL,
                        span: 1,
                    },
                    {
                        label: 'Update At',
                        key: 'updateAt',
                        type: FieldType.TIME_FULL,
                        span: 1,
                    },
                    {
                        label: 'Email',
                        key: 'user.email',
                        type: FieldType.TEXT,
                        span: 1,
                    },
                    {
                        label: 'Phone',
                        key: 'user.phone',
                        type: FieldType.TEXT,
                        span: 1,
                    },
                    {
                        label: 'Gender',
                        key: 'user.gender',
                        type: FieldType.BADGE_API,
                        span: 1,
                        apiAction: userApi.v1GetEnumGender,
                    },
                    {
                        label: 'Status',
                        key: 'status',
                        type: FieldType.BADGE_API,
                        span: 1,
                        apiAction: bookingApi.v1GetEnumStatus,
                    },
                    {
                        label: 'Is Deleted',
                        key: 'isDeleted',
                        type: FieldType.BOOLEAN,
                        span: 2,
                    },

                    {
                        label: 'Avatar',
                        key: 'imageUrl',
                        type: FieldType.THUMBNAIL,
                        span: 3,
                    },
                    {
                        label: 'Description',
                        key: 'description',
                        type: FieldType.TEXT,
                        span: 3,
                    },
                ]}
                record={booking.data}
                title="Expert Dashboard"
            />
            <div>
                <Table<BookingOrder>
                    dataSource={booking.data?.bookingOrders.sort((a, b) => {
                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    })}
                    columns={[
                        {
                            key: 'user.name',
                            title: 'Customer Name',
                            render: (record) => {
                                const value = _get(record, 'user.name');
                                return <FieldText value={value} />;
                            },
                        },
                        {
                            key: 'startTime',
                            title: 'Start Time',
                            render: (record) => {
                                const value = _get(record, 'startTime');
                                return <FieldTime value={value} format="DD/MM/YYYY HH:mm" />;
                            },
                        },
                        {
                            key: 'endTime',
                            title: 'End Time',
                            render: (record) => {
                                const value = _get(record, 'startTime');
                                return <FieldTime value={value} format="DD/MM/YYYY HH:mm" />;
                            },
                        },
                        {
                            key: 'price',
                            title: 'Fee (VNĐ)',
                            render: (record) => {
                                const value = _get(record, 'price');
                                return <FieldNumber value={value} />;
                            },
                        },
                        {
                            key: 'status',
                            title: 'Status',
                            render: (record) => {
                                const value = _get(record, 'status');
                                return <FieldBadgeApi value={value} apiAction={bookingOrderApi.v1GetEnumStatus} />;
                            },
                        },

                        {
                            key: 'id',
                            title: '',
                            width: 50,
                            render: (record: BookingOrder) => {
                                return (
                                    <div className="flex gap-2">
                                        <DrawerBuilder
                                            btnLabel=""
                                            width="50%"
                                            drawerTitle="Booking Detail"
                                            btnProps={{
                                                size: 'small',
                                                icon: <EyeOutlined rev="" />,
                                            }}
                                        >
                                            <FieldBuilder
                                                title="Customer Detail"
                                                record={record.user}
                                                fields={[
                                                    {
                                                        label: 'Name',
                                                        key: 'name',
                                                        type: FieldType.TEXT,
                                                        span: 2,
                                                    },
                                                    {
                                                        label: 'Gender',
                                                        key: 'gender',
                                                        type: FieldType.BADGE_API,
                                                        apiAction: userApi.v1GetEnumGender,
                                                        span: 1,
                                                    },
                                                    {
                                                        label: 'Email',
                                                        key: 'email',
                                                        type: FieldType.TEXT,
                                                        span: 2,
                                                    },
                                                    {
                                                        label: 'Phone',
                                                        key: 'phone',
                                                        type: FieldType.TEXT,
                                                        span: 1,
                                                    },

                                                    {
                                                        label: 'Age',
                                                        key: 'age',
                                                        type: FieldType.NUMBER,
                                                        span: 2,
                                                    },
                                                    {
                                                        label: 'Status',
                                                        key: 'status',
                                                        type: FieldType.BADGE_API,
                                                        apiAction: userApi.v1GetEnumStatus,
                                                        span: 1,
                                                    },
                                                    {
                                                        label: 'Create At',
                                                        key: 'createAt',
                                                        type: FieldType.TIME_FULL,
                                                        span: 3,
                                                    },
                                                    {
                                                        label: 'Address',
                                                        key: 'address',
                                                        type: FieldType.NUMBER,
                                                        span: 3,
                                                    },
                                                ]}
                                            />
                                            <FieldBuilder
                                                title="Booking Detail"
                                                record={record}
                                                extra={
                                                    <div className="flex items-center gap-2">
                                                        {BookingOrderStatus.PAID === record.status && (
                                                            <>
                                                                <CTAButton
                                                                    ctaApi={() => {
                                                                        return bookingOrderApi.v1Update(record.id, {
                                                                            status: BookingOrderStatus.COMPLETED,
                                                                            description: record.description,
                                                                            endTime: record.endTime,
                                                                            price: record.price,
                                                                            startTime: record.startTime,
                                                                            meetingUrl: record.meetingUrl,
                                                                        });
                                                                    }}
                                                                    extraOnSuccess={() => {
                                                                        booking.refetch();
                                                                    }}
                                                                    isConfirm
                                                                    confirmMessage="Are you sure you want to import this booking order?"
                                                                >
                                                                    <Button size="small" type="primary">
                                                                        Complete Booking
                                                                    </Button>
                                                                </CTAButton>
                                                            </>
                                                        )}
                                                        {(BookingOrderStatus.PENDING === record.status ||
                                                            BookingOrderStatus.CONFIRMED === record.status) && (
                                                            <>
                                                                <CTAButton
                                                                    ctaApi={() => {
                                                                        return bookingOrderApi.v1Update(record.id, {
                                                                            status: BookingOrderStatus.CANCELLED,
                                                                            description: record.description,
                                                                            endTime: record.endTime,
                                                                            price: record.price,
                                                                            startTime: record.startTime,
                                                                            meetingUrl: record.meetingUrl,
                                                                        });
                                                                    }}
                                                                    extraOnSuccess={() => {
                                                                        booking.refetch();
                                                                    }}
                                                                    isConfirm
                                                                    confirmMessage="Are you sure you want to cancel this booking order?"
                                                                >
                                                                    <Button size="small" type="primary" danger>
                                                                        Cancel Booking
                                                                    </Button>
                                                                </CTAButton>
                                                            </>
                                                        )}
                                                    </div>
                                                }
                                                fields={[
                                                    {
                                                        label: 'Customer Name',
                                                        key: 'user.name',
                                                        type: FieldType.TEXT,
                                                        span: 3,
                                                    },
                                                    {
                                                        label: 'Fee (VND)',
                                                        key: 'price',
                                                        type: FieldType.NUMBER,
                                                        span: 3,
                                                    },
                                                    {
                                                        label: 'Start Time',
                                                        key: 'startTime',
                                                        type: FieldType.TIME_FULL,
                                                        span: 1,
                                                    },
                                                    {
                                                        label: 'End Time',
                                                        key: 'endTime',
                                                        type: FieldType.TIME_FULL,
                                                        span: 2,
                                                    },
                                                    {
                                                        label: 'Create At',
                                                        key: 'createAt',
                                                        type: FieldType.TIME_FULL,
                                                        span: 1,
                                                    },
                                                    {
                                                        label: 'Status',
                                                        key: 'status',
                                                        type: FieldType.BADGE_API,
                                                        apiAction: bookingOrderApi.v1GetEnumStatus,
                                                        span: 2,
                                                    },
                                                    {
                                                        label: 'Description',
                                                        key: 'description',
                                                        type: FieldType.TEXT,
                                                        span: 3,
                                                    },
                                                    {
                                                        label: 'Meeting Url',
                                                        key: 'meetingUrl',
                                                        type: FieldType.LINK_BUTTON,
                                                        span: 3,
                                                    },
                                                ]}
                                            />
                                        </DrawerBuilder>
                                        <ModalBuilder
                                            btnLabel=""
                                            modalTitle={`Edit Booking Order `}
                                            btnProps={{
                                                size: 'small',
                                                icon: <EditOutlined rev="" />,
                                            }}
                                        >
                                            <FormBuilder<BookingOrderIV1UpdateDto>
                                                apiAction={(dto) => {
                                                    return bookingOrderApi.v1Update(record.id, dto);
                                                }}
                                                onExtraSuccessAction={() => {
                                                    booking.refetch();
                                                }}
                                                fields={[
                                                    {
                                                        label: 'Description',
                                                        name: 'description',
                                                        type: NKFormType.TEXTAREA,
                                                        span: 3,
                                                    },
                                                ]}
                                                schema={{
                                                    description: joi.string().required(),
                                                    endTime: joi.date().required(),
                                                    price: joi.number().required(),
                                                    startTime: joi.date().required(),
                                                    status: joi.string().required(),
                                                    meetingUrl: joi.string().required(),
                                                }}
                                                title=""
                                                defaultValues={{
                                                    description: record.description || '',
                                                    endTime: record.endTime || '',
                                                    price: record.price || 0,
                                                    startTime: record.startTime || '',
                                                    status: record.status || '',
                                                    meetingUrl: record.meetingUrl || '',
                                                }}
                                            />
                                        </ModalBuilder>
                                    </div>
                                );
                            },
                        },
                    ]}
                    pagination={false}
                />
            </div>
        </div>
    );
};

export default Page;
