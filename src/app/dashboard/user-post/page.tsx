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
import { userPostApi } from '@/core/api/user-post.api';
import { FieldType } from '@/core/components/field/FieldDisplay';
import TableBuilder from '@/core/components/table/TableBuilder';
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
                sourceKey="userPost"
                title="Forum"
                queryApi={userPostApi.v1Get}
                extraButtons={
                    <div key="3">
                        <Link href={NKRouter.userPost.create()}>
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
                                router.push(NKRouter.userPost.detail(id));
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
                        key: 'user.name',
                        title: 'User Name',
                        type: FieldType.TEXT,
                    },
                    {
                        key: 'title',
                        title: 'Title',
                        type: FieldType.TEXT,
                    },
                    {
                        key: 'tag',
                        title: 'Tags',
                        type: FieldType.TEXT,
                        sorter: false,
                    },

                    {
                        key: 'createdAt',
                        title: 'Created At',
                        type: FieldType.TIME_FULL,
                    },
                ]}
                filters={[]}
            />
        </>
    );
};

export default Page;
