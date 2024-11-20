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
import { subscriptionApi } from '@/core/api/subscription.api';
import { FieldType } from '@/core/components/field/FieldDisplay';
import { NKFormType } from '@/core/components/form/NKForm';
import TableBuilder from '@/core/components/table/TableBuilder';
import { FilterComparator } from '@/core/models/common';
import { toastError } from '@/core/utils/api.helper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const router = useRouter();
    const deleteSubscriptionCategory = useMutation(
        (id: string) => {
            return subscriptionApi.v1Delete(id);
        },
        {
            onSuccess: () => {
                toast.success('Delete subscription successfully');
            },
            onError: toastError,
        },
    );

    return (
        <>
            <TableBuilder
                sourceKey="subscription"
                title="Subscription"
                queryApi={subscriptionApi.v1Get}
                extraButtons={
                    <div key="3">
                        <Link href={NKRouter.subscription.create()}>
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
                                router.push(NKRouter.subscription.detail(id));
                            }
                        },
                    },
                    {
                        label: 'Edit',
                        onClick: (record) => {
                            const id = _get(record, 'id');
                            if (id) {
                                router.push(NKRouter.subscription.edit(id));
                            }
                        },
                    },
                    {
                        label: 'Delete',
                        onClick: (record) => {
                            const id = _get(record, 'id');
                            if (id) {
                                deleteSubscriptionCategory.mutate(id);
                            }
                        },
                    },
                ]}
                columns={[
                    {
                        title: 'Name',
                        key: 'name',
                        type: FieldType.TEXT,
                    },

                    {
                        title: 'Description',
                        key: 'description',
                        type: FieldType.TEXT,
                    },
                    {
                        title: 'Duration (Days)',
                        key: 'duration',
                        type: FieldType.NUMBER,
                    },
                    {
                        title: 'Index',
                        key: 'index',
                        type: FieldType.NUMBER,
                    },
                    {
                        title: 'Price (VNĐ)',
                        key: 'price',
                        type: FieldType.NUMBER,
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
                ]}
            />
        </>
    );
};

export default Page;
