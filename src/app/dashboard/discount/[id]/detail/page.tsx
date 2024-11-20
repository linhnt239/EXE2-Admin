'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { orderDiscountApi } from '@/core/api/order-discount.api';
import CTAButton from '@/core/components/cta/CTABtn';
import FieldBuilder from '@/core/components/field/FieldBuilder';
import { FieldType } from '@/core/components/field/FieldDisplay';
import { OrderDiscount } from '@/core/models/orderDiscount';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const id = _get(params, 'id') as string;

    const orderDiscount = useQuery(['orderDiscount', id], () => {
        return orderDiscountApi.v1GetById(id);
    });

    return (
        <div className="max-w-xl">
            <FieldBuilder<OrderDiscount>
                fields={[
                    {
                        label: 'Name',
                        key: 'name',
                        type: FieldType.TEXT,
                        span: 3,
                    },
                    {
                        label: 'Code',
                        key: 'code',
                        type: FieldType.TEXT,
                        span: 3,
                    },
                    {
                        label: 'Value',
                        key: 'value',
                        type: FieldType.NUMBER,
                        span: 3,
                    },
                    {
                        label: 'Type',
                        key: 'type',
                        type: FieldType.BADGE_API,
                        span: 3,
                        apiAction: orderDiscountApi.v1GetEnumType,
                    },
                    {
                        label: 'Number of used',
                        key: 'numberOfUsed',
                        type: FieldType.NUMBER,
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
                        label: 'Is Active',
                        key: 'isActive',
                        type: FieldType.BOOLEAN,
                        span: 3,
                    },
                    {
                        label: 'Is Deleted',
                        key: 'isDeleted',
                        type: FieldType.BOOLEAN,
                        span: 3,
                    },
                ]}
                record={orderDiscount.data}
                extra={
                    <div className="flex items-center gap-4">
                        <CTAButton
                            ctaApi={() => {
                                return orderDiscountApi.v1Delete(id);
                            }}
                            isConfirm
                        >
                            <Button danger>Delete</Button>
                        </CTAButton>

                        <Link href={NKRouter.orderDiscount.edit(id)}>
                            <Button>Edit</Button>
                        </Link>
                    </div>
                }
                title="Order Discount"
            />
        </div>
    );
};

export default Page;
