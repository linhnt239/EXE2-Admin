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
import { feedbackApi } from '@/core/api/feedback.api';
import { orderDiscountApi } from '@/core/api/order-discount.api';
import { FieldType } from '@/core/components/field/FieldDisplay';
import { NKFormType } from '@/core/components/form/NKForm';
import TableBuilder from '@/core/components/table/TableBuilder';
import { FilterComparator } from '@/core/models/common';
import { toastError } from '@/core/utils/api.helper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const router = useRouter();
    const deleteOrderDiscount = useMutation(
        (id: string) => {
            return orderDiscountApi.v1Delete(id);
        },
        {
            onSuccess: () => {
                toast.success('Delete order discount successfully!');
            },
            onError: toastError,
        },
    );

    return (
        <>
            <TableBuilder
                sourceKey="feedback"
                title="Discount"
                queryApi={orderDiscountApi.v1Get}
                extraButtons={
                    <div key="3">
                        <Link href={NKRouter.orderDiscount.create()}>
                            <Button icon={<PlusOutlined rev="" />}>Create New</Button>
                        </Link>
                    </div>
                }
                actionColumns={[
                    {
                        label: 'View Detail',
                        onClick: (record) => {
                            const id = _get(record, 'id');
                            if (id) {
                                router.push(NKRouter.orderDiscount.detail(id));
                            }
                        },
                    },
                    {
                        label: 'Edit',
                        onClick: (record) => {
                            const id = _get(record, 'id');
                            if (id) {
                                router.push(NKRouter.orderDiscount.edit(id));
                            }
                        },
                    },
                    {
                        label: 'Delete',
                        onClick: (record) => {
                            const id = _get(record, 'id');
                            if (id) {
                                deleteOrderDiscount.mutate(id);
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
                        key: 'name',
                        title: 'Name',
                        type: FieldType.TEXT,
                    },
                    {
                        key: 'code',
                        title: 'Code',
                        type: FieldType.TEXT,
                    },
                    {
                        key: 'value',
                        title: 'Value',
                        type: FieldType.NUMBER,
                    },
                    {
                        key: 'type',
                        title: 'Type',
                        type: FieldType.BADGE_API,
                        apiAction: orderDiscountApi.v1GetEnumType,
                        width: 100,
                    },
                    {
                        key: 'numberOfUsed',
                        title: 'Number of used',
                        type: FieldType.NUMBER,
                        width: 150,
                    },
                    {
                        key: 'isActive',
                        title: 'Is Active',
                        width: 100,
                        type: FieldType.BOOLEAN,
                    },
                    {
                        key: 'createdAt',
                        title: 'Created At',
                        type: FieldType.TIME_FULL,
                    },
                ]}
                filters={[
                    {
                        name: 'name',
                        label: 'Name',
                        type: NKFormType.TEXT,
                        comparator: FilterComparator.LIKE,
                        defaultValue: '',
                    },
                    {
                        name: 'code',
                        label: 'Code',
                        type: NKFormType.TEXT,
                        comparator: FilterComparator.LIKE,
                        defaultValue: '',
                    },
                ]}
            />
        </>
    );
};

export default Page;
