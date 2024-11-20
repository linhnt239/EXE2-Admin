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
import { FieldType } from '@/core/components/field/FieldDisplay';
import { NKFormType } from '@/core/components/form/NKForm';
import TableBuilder from '@/core/components/table/TableBuilder';
import { FilterComparator } from '@/core/models/common';
import { toastError } from '@/core/utils/api.helper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const router = useRouter();
    const deleteFeedback = useMutation(
        (id: string) => {
            return feedbackApi.v1Delete(id);
        },
        {
            onSuccess: () => {
                toast.success('Delete feedback successfully');
            },
            onError: toastError,
        },
    );

    return (
        <>
            <TableBuilder
                sourceKey="feedback"
                title="Test"
                queryApi={feedbackApi.v1Get}
                extraButtons={
                    <div key="3">
                        <Link href={NKRouter.feedback.create()}>
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
                                router.push(NKRouter.feedback.detail(id));
                            }
                        },
                    },
                    {
                        label: 'Edit',
                        onClick: (record) => {
                            const id = _get(record, 'id');
                            if (id) {
                                router.push(NKRouter.feedback.edit(id));
                            }
                        },
                    },
                    {
                        label: 'Delete',
                        onClick: (record) => {
                            const id = _get(record, 'id');
                            if (id) {
                                deleteFeedback.mutate(id);
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
                        key: 'isActive',
                        title: 'Is Active',
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
                ]}
            />
        </>
    );
};

export default Page;
