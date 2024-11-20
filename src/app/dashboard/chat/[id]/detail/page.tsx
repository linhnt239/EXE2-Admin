'use client';

import * as React from 'react';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { Table } from 'antd';
import _get from 'lodash/get';

import { chatApi } from '@/core/api/chat.api';
import { userApi } from '@/core/api/user.api';
import FieldBuilder from '@/core/components/field/FieldBuilder';
import FieldDisplay, { FieldType } from '@/core/components/field/FieldDisplay';
import { Chat } from '@/core/models/chat';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const id = _get(params, 'id') as string;

    const chat = useQuery(
        ['chat', id],
        () => {
            return chatApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );
    if (chat.isFetching) {
        return <div>Loading...</div>;
    }

    return (
        <div className="">
            <FieldBuilder<Chat>
                record={chat.data}
                title="Chat"
                fields={[
                    {
                        label: 'Name',
                        key: 'name',
                        type: FieldType.TEXT,
                        span: 2,
                    },

                    {
                        label: 'Status',
                        key: 'status',
                        type: FieldType.BADGE_API,
                        span: 1,
                        apiAction: chatApi.v1GetEnumStatus,
                    },
                    {
                        label: 'Number of users',
                        key: 'users',
                        type: FieldType.LENGTH,
                        span: 2,
                    },
                    {
                        label: 'Number of messages',
                        key: 'chatMessages',
                        type: FieldType.LENGTH,
                        span: 1,
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
                dataSource={chat.data?.users}
                className="fade-in"
                columns={[
                    {
                        key: 'name',
                        title: 'Name',
                        render: (record) => {
                            const value = _get(record, 'name');
                            return <FieldDisplay type={FieldType.TEXT} value={value} />;
                        },
                    },
                    {
                        key: 'email',
                        title: 'Email',
                        render: (record) => {
                            const value = _get(record, 'email');
                            return <FieldDisplay type={FieldType.TEXT} value={value} />;
                        },
                    },
                    {
                        key: 'status',
                        title: 'Status',
                        render: (record) => {
                            const value = _get(record, 'status');
                            return <FieldDisplay type={FieldType.BADGE_API} apiAction={userApi.v1GetEnumStatus} value={value} />;
                        },
                    },
                    {
                        key: 'lastActive',
                        title: 'Last Active',
                        render: (record) => {
                            const value = _get(record, 'lastActive');
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
