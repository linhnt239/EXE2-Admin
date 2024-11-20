'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { userGroupApi } from '@/core/api/user-group.api';
import { FieldType } from '@/core/components/field/FieldDisplay';
import TableBuilder from '@/core/components/table/TableBuilder';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const router = useRouter();

    return (
        <>
            <TableBuilder
                sourceKey="userGroup"
                title="User Group"
                queryApi={userGroupApi.v1Get}
                actionColumns={[
                    {
                        label: 'View Detail',
                        onClick: (record) => {
                            const id = _get(record, 'id');
                            if (id) {
                                router.push(NKRouter.userGroup.detail(id));
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
                        title: 'Number of users',
                        key: 'userGroupMembers',
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
            />
        </>
    );
};

export default Page;
