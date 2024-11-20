'use client';

import * as React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button } from 'antd';
import _get from 'lodash/get';
import { toast } from 'react-toastify';

import { NKRouter } from '@/core/NKRouter';
import { musicAuthorApi } from '@/core/api/music-author.api';
import { musicCategoryApi } from '@/core/api/music-category.api';
import { musicApi } from '@/core/api/music.api';
import { orderApi } from '@/core/api/order.api';
import { FieldType } from '@/core/components/field/FieldDisplay';
import { NKFormType } from '@/core/components/form/NKForm';
import TableBuilder from '@/core/components/table/TableBuilder';
import { FilterComparator } from '@/core/models/common';
import { OrderItem } from '@/core/models/orderItem';
import { toastError } from '@/core/utils/api.helper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const router = useRouter();

    return (
        <>
            <TableBuilder
                sourceKey="order"
                title="Order"
                queryApi={orderApi.v1Get}
                actionColumns={[
                    {
                        label: 'View Detail',
                        onClick: (record) => {
                            const id = _get(record, 'id');
                            if (id) {
                                router.push(NKRouter.order.detail(id));
                            }
                        },
                    },
                ]}
                columns={[
                    {
                        key: 'id',
                        title: 'ID',
                        type: FieldType.UUID,
                    },
                    {
                        title: 'Customer',
                        key: 'user.name',
                        type: FieldType.TEXT,
                    },
                    {
                        key: 'type',
                        title: 'Type',
                        type: FieldType.BADGE_API,
                        apiAction: orderApi.v1GetEnumType,
                    },

                    {
                        key: 'orderItems',
                        title: 'Total Item',
                        type: FieldType.LENGTH,
                    },
                    {
                        key: 'afterDiscountTotal',
                        title: 'Total (VNĐ)',
                        type: FieldType.NUMBER,
                    },
                    {
                        key: 'createdAt',
                        title: 'Created At',
                        type: FieldType.TIME_FULL,
                    },
                ]}
            />
        </>
    );
};

export default Page;
