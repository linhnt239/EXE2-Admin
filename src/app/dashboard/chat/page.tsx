'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { chatApi } from '@/core/api/chat.api';
import { FieldType } from '@/core/components/field/FieldDisplay';
import TableBuilder from '@/core/components/table/TableBuilder';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const router = useRouter();

    return (
        <>
            <TableBuilder
                sourceKey="chat"
                title="Chat"
                queryApi={chatApi.v1Get}
                actionColumns={[
                    {
                        label: 'View Detail',
                        onClick: (record) => {
                            const id = _get(record, 'id');
                            if (id) {
                                router.push(NKRouter.chat.detail(id));
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
                        title: 'Status',
                        key: 'status',
                        type: FieldType.BADGE_API,
                        apiAction: chatApi.v1GetEnumStatus,
                    },
                    {
                        title: 'Number of users',
                        key: 'users',
                        type: FieldType.LENGTH,
                    },
                    {
                        title: 'Created At',
                        key: 'createdAt',
                        type: FieldType.TIME_FULL,
                    },
                    {
                        title: 'Updated At',
                        key: 'updatedAt',
                        type: FieldType.TIME_FULL,
                    },
                ]}
                // filters={[
                //     {
                //         name: 'subscription',
                //         label: 'Subscription',
                //         type: NKFormType.TEXT,
                //         comparator: FilterComparator.LIKE,
                //         defaultValue: '',
                //     },
                // ]}
            />
        </>
    );
};

export default Page;
