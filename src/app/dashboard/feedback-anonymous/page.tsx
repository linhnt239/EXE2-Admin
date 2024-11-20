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
import { feedbackAnonymousApi } from '@/core/api/feedback-anonymous.api';
import { feedbackApi } from '@/core/api/feedback.api';
import { FieldType } from '@/core/components/field/FieldDisplay';
import { NKFormType } from '@/core/components/form/NKForm';
import TableBuilder from '@/core/components/table/TableBuilder';
import { FilterComparator } from '@/core/models/common';
import { toastError } from '@/core/utils/api.helper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const router = useRouter();

    return (
        <>
            <TableBuilder
                sourceKey="feedback-anonymous"
                title="Contact"
                queryApi={feedbackAnonymousApi.v1Get}
                actionColumns={[
                    {
                        label: 'View Detail',
                        onClick: (record) => {
                            const id = _get(record, 'id');
                            if (id) {
                                router.push(NKRouter.feedbackAnonymous.detail(id));
                            }
                        },
                    },
                    {
                        label: 'Edit',
                        onClick: (record) => {
                            const id = _get(record, 'id');
                            if (id) {
                                router.push(NKRouter.feedbackAnonymous.edit(id));
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
                        key: 'email',
                        title: 'Email',
                        type: FieldType.TEXT,
                    },

                    {
                        key: 'status',
                        title: 'Status',
                        type: FieldType.BADGE_API,
                        apiAction: feedbackAnonymousApi.v1GetEnumStatus,
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
