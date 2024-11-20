'use client';

import * as React from 'react';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { Table } from 'antd';
import _get from 'lodash/get';

import { userGroupApi } from '@/core/api/user-group.api';
import { userApi } from '@/core/api/user.api';
import FieldBuilder from '@/core/components/field/FieldBuilder';
import FieldDisplay, { FieldType } from '@/core/components/field/FieldDisplay';
import { UserGroup } from '@/core/models/userGroup';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const id = _get(params, 'id') as string;

    const userGroup = useQuery(
        ['user-group', id],
        () => {
            return userGroupApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );
    if (userGroup.isFetching) {
        return <div>Loading...</div>;
    }

    return (
        <div className="">
            <FieldBuilder<UserGroup>
                record={userGroup.data}
                title="User Group"
                fields={[
                    {
                        label: 'Name',
                        key: 'name',
                        type: FieldType.TEXT,
                        span: 2,
                    },
                    {
                        label: 'Number of users',
                        key: 'userGroupMembers',
                        type: FieldType.LENGTH,
                        span: 2,
                    },
                    {
                        label: 'Is Deleted',
                        key: 'isDeleted',
                        type: FieldType.BOOLEAN,
                        span: 1,
                    },

                    {
                        label: 'Create At',
                        key: 'createdAt',
                        type: FieldType.TIME_FULL,
                        span: 1,
                    },
                    {
                        label: 'Update At',
                        key: 'updatedAt',
                        type: FieldType.TIME_FULL,
                        span: 1,
                    },
                ]}
            />
            <Table
                dataSource={userGroup.data?.userGroupMembers}
                className="fade-in"
                columns={[
                    {
                        key: 'user.name',
                        title: 'Name',
                        render: (record) => {
                            const value = _get(record, 'user.name');
                            return <FieldDisplay type={FieldType.TEXT} value={value} />;
                        },
                    },
                    {
                        key: 'user.email',
                        title: 'Email',
                        render: (record) => {
                            const value = _get(record, 'user.email');
                            return <FieldDisplay type={FieldType.TEXT} value={value} />;
                        },
                    },
                    {
                        key: 'user.status',
                        title: 'Status',
                        render: (record) => {
                            const value = _get(record, 'user.status');
                            return <FieldDisplay type={FieldType.BADGE_API} apiAction={userApi.v1GetEnumStatus} value={value} />;
                        },
                    },
                    {
                        key: 'user.lastActive',
                        title: 'Last Active',
                        render: (record) => {
                            const value = _get(record, 'user.lastActive');
                            return <FieldDisplay type={FieldType.TIME_FULL} value={value} />;
                        },
                    },
                ]}
                pagination={false}
            />
        </div>
    );
};

export default Page;
