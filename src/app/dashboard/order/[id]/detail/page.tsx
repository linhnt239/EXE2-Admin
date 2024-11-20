'use client';

import * as React from 'react';

import { useParams } from 'next/navigation';

import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Table, Tabs } from 'antd';
import joi from 'joi';
import _get from 'lodash/get';

import { orderDiscountApi } from '@/core/api/order-discount.api';
import { UpdateOrderIV1Put, orderApi } from '@/core/api/order.api';
import { userApi } from '@/core/api/user.api';
import CTAButton from '@/core/components/cta/CTABtn';
import FieldBuilder from '@/core/components/field/FieldBuilder';
import { FieldType } from '@/core/components/field/FieldDisplay';
import FieldNumber from '@/core/components/field/FieldNumber';
import FieldText from '@/core/components/field/FieldText';
import FieldThumbnail from '@/core/components/field/FieldThumbnail';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';
import ModalBuilder from '@/core/components/modal/ModalBuilder';
import { Order } from '@/core/models/order';
import { User } from '@/core/models/user';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const [key, setKey] = React.useState('1');
    const id = _get(params, 'id') as string;

    const order = useQuery(['order', id], () => {
        return orderApi.v1GetById(id);
    });

    const priceOrder = useQuery(['price-order', order], () => {
        if (order.data?.type === 'CART') {
            return orderApi.v1GetPrice(id);
        } else {
            return order.data;
        }
    });

    if (order.isFetching || !order.data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="">
            <Tabs
                defaultActiveKey={key}
                onChange={(key) => setKey(key)}
                items={[
                    {
                        key: '1',
                        label: 'Order Information',
                        children: (
                            <FieldBuilder<Order>
                                extra={
                                    <div className="flex items-center gap-4">
                                        <ModalBuilder
                                            btnLabel="Edit Note"
                                            modalTitle={`Edit Note`}
                                            btnProps={{
                                                size: 'small',
                                                icon: <EditOutlined rev="" />,
                                            }}
                                        >
                                            <FormBuilder<UpdateOrderIV1Put>
                                                apiAction={(dto) => {
                                                    return orderApi.v1Put(id, dto);
                                                }}
                                                onExtraSuccessAction={() => {
                                                    order.refetch();
                                                }}
                                                fields={[
                                                    {
                                                        label: 'Note',
                                                        name: 'note',
                                                        type: NKFormType.TEXTAREA,
                                                        span: 3,
                                                    },
                                                ]}
                                                schema={{
                                                    note: joi.string().failover(''),
                                                    address: joi.string().failover(''),
                                                    name: joi.string().failover(''),
                                                    phone: joi.string().failover(''),
                                                }}
                                                title=""
                                                defaultValues={{
                                                    note: order.data.note,
                                                    address: order.data.address,
                                                    name: order.data.name,
                                                    phone: order.data.phone,
                                                }}
                                            />
                                        </ModalBuilder>
                                        {order.data?.type !== 'ORDER' && (
                                            <CTAButton
                                                ctaApi={() => {
                                                    return orderApi.v1PostMarkAsPaid(order.data.id);
                                                }}
                                                isConfirm
                                                extraOnSuccess={() => {
                                                    order.refetch();
                                                }}
                                                confirmMessage='Are you sure you want to mark this order as "Paid"?'
                                            >
                                                <Button size="small" type="primary">
                                                    Mark As Paid
                                                </Button>
                                            </CTAButton>
                                        )}
                                        {order.data?.type !== 'CANCELED' && (
                                            <CTAButton
                                                ctaApi={() => {
                                                    return orderApi.v1PostMarkAsCanceled(order.data.id);
                                                }}
                                                isConfirm
                                                extraOnSuccess={() => {
                                                    order.refetch();
                                                }}
                                                confirmMessage='Are you sure you want to mark this order as "Canceled"?'
                                            >
                                                <Button size="small" type="primary" danger>
                                                    Mark As Canceled
                                                </Button>
                                            </CTAButton>
                                        )}
                                    </div>
                                }
                                fields={[
                                    {
                                        label: 'ID',
                                        key: 'id',
                                        type: FieldType.UUID,
                                        span: 1,
                                    },
                                    {
                                        label: 'Customer Name',
                                        key: 'name',
                                        type: FieldType.TEXT,
                                        span: 1,
                                    },
                                    {
                                        label: 'Customer Phone',
                                        key: 'phone',
                                        type: FieldType.TEXT,
                                        span: 1,
                                    },
                                    {
                                        label: 'Type',
                                        key: 'type',
                                        type: FieldType.BADGE_API,
                                        span: 1,
                                        apiAction: orderApi.v1GetEnumType,
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
                                        label: 'Address',
                                        key: 'address',
                                        type: FieldType.MULTILINE_TEXT,
                                        span: 3,
                                    },
                                    {
                                        label: 'Note',
                                        key: 'note',
                                        type: FieldType.MULTILINE_TEXT,
                                        span: 3,
                                    },
                                    ...(order.data.orderDiscount
                                        ? ([
                                              {
                                                  label: 'Discount Name',
                                                  key: 'orderDiscount.name',
                                                  type: FieldType.TEXT,
                                                  span: 1,
                                              },
                                              {
                                                  label: 'Discount Value',
                                                  key: 'orderDiscount.value',
                                                  type: FieldType.NUMBER,
                                                  span: 1,
                                              },
                                              {
                                                  label: 'Discount Type',
                                                  key: 'orderDiscount.type',
                                                  type: FieldType.BADGE_API,
                                                  span: 1,
                                                  apiAction: orderDiscountApi.v1GetEnumType,
                                              },
                                          ] as any)
                                        : []),
                                ]}
                                record={order.data}
                                title="Order Information"
                            />
                        ),
                    },
                    {
                        key: '2',
                        label: 'Customer Information',

                        children: (
                            <FieldBuilder<User>
                                fields={[
                                    {
                                        label: 'ID',
                                        key: 'id',
                                        type: FieldType.UUID,
                                        span: 1,
                                    },
                                    {
                                        label: 'Customer Name',
                                        key: 'name',
                                        type: FieldType.TEXT,
                                        span: 1,
                                    },
                                    {
                                        label: 'Customer Phone',
                                        key: 'phone',
                                        type: FieldType.TEXT,
                                        span: 1,
                                    },

                                    {
                                        label: 'Customer Email',
                                        key: 'email',
                                        type: FieldType.TEXT,
                                        span: 1,
                                    },
                                    {
                                        label: 'Status',
                                        key: 'status',
                                        type: FieldType.BADGE_API,
                                        span: 1,
                                        apiAction: userApi.v1GetEnumStatus,
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
                                        label: 'Is Deleted',
                                        key: 'isDeleted',
                                        type: FieldType.BOOLEAN,
                                        span: 2,
                                    },
                                    {
                                        label: 'Address',
                                        key: 'address',
                                        type: FieldType.MULTILINE_TEXT,
                                        span: 3,
                                    },
                                ]}
                                record={order.data.user}
                                title="Customer Information"
                            />
                        ),
                    },
                ]}
            />

            <div>
                <Table
                    dataSource={order.data?.orderItems.sort((a, b) => {
                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    })}
                    columns={[
                        {
                            key: 'name',
                            title: 'Name',
                            render: (record) => {
                                const value = _get(record, 'productVariant.name');
                                return <FieldText value={value} />;
                            },
                        },
                        {
                            key: 'image',
                            title: 'Image',
                            width: 300,
                            render: (record) => {
                                const value = _get(record, 'productVariant.imageUrls[0]', '');

                                return <FieldThumbnail value={value} />;
                            },
                        },
                        {
                            key: 'quantity',
                            title: 'Quantity',
                            render: (record) => {
                                const value = _get(record, 'quantity', 0);
                                return <FieldNumber value={value} />;
                            },
                        },
                        {
                            key: 'price',
                            title: 'Price per Item (VNĐ)',
                            width: 200,
                            render: (record) => {
                                const value = _get(record, 'productVariant.price');
                                return <FieldNumber value={value} />;
                            },
                        },
                        {
                            width: 200,
                            title: 'Total (VNĐ)',
                            key: 'total',
                            render: (record) => {
                                const value = _get(record, 'price', 0);
                                return <FieldNumber value={value} />;
                            },
                        },
                    ]}
                    pagination={false}
                />
                <Table
                    showHeader={false}
                    pagination={false}
                    dataSource={[
                        {
                            label: 'Before Discount Total',
                            value: priceOrder.data?.beforeDiscountTotal,
                        },
                        {
                            label: 'Discount Amount',

                            value: priceOrder.data?.discountAmount,
                        },
                        {
                            label: 'After Discount Total',
                            value: priceOrder.data?.afterDiscountTotal,
                        },
                    ]}
                    columns={[
                        {
                            key: 'label',
                        },
                        {
                            key: 'value',
                        },
                        {
                            key: 'value',
                        },
                        {
                            key: 'label',
                            title: 'Label',
                            width: 200,
                            render: (record) => {
                                const value = _get(record, 'label', '');
                                return <FieldText value={value} />;
                            },
                        },
                        {
                            key: 'value',
                            title: 'Total (VNĐ)',
                            width: 200,
                            render: (record) => {
                                const value = _get(record, 'value', 0);
                                return <FieldNumber value={value} />;
                            },
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export default Page;
