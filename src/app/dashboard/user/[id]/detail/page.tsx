'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { FileSearchOutlined } from '@ant-design/icons';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Tabs } from 'antd';
import clsx from 'clsx';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { userAdminApi } from '@/core/api/user-admin.api';
import { userWalletApi } from '@/core/api/user-wallet.api';
import { userApi } from '@/core/api/user.api';
import CTAButton from '@/core/components/cta/CTABtn';
import FieldBuilder from '@/core/components/field/FieldBuilder';
import { FieldType } from '@/core/components/field/FieldDisplay';
import { useBooleanWatcher } from '@/core/hooks/useBooleanWatcher';
import { User } from '@/core/models/user';
import { UserWallet } from '@/core/models/userWallet';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const id = _get(params, 'id') as string;

    const user = useQuery(
        ['user', id],
        () => {
            return userAdminApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );

    const userWallet = useQuery(
        ['user-wallet-user-id', id],
        () => {
            return userWalletApi.v1GetByUserId(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );

    const isBanned = useBooleanWatcher(user.data?.status, 'BANNED');

    return (
        <div className="w-full">
            <FieldBuilder<User>
                fields={[
                    {
                        label: 'Avatar',
                        key: 'avatar',
                        type: FieldType.THUMBNAIL,
                        span: 3,
                    },
                    {
                        label: 'Name',
                        key: 'name',
                        type: FieldType.TEXT,
                        span: 1,
                    },
                    {
                        label: 'CMND / CCCD',
                        key: 'citizenId',
                        type: FieldType.TEXT,
                        span: 1,
                    },
                    {
                        label: 'ID',
                        key: 'id',
                        type: FieldType.TEXT,
                        span: 1,
                    },

                    {
                        label: 'Email',
                        key: 'email',
                        type: FieldType.TEXT,
                        span: 1,
                    },
                    {
                        label: 'Phone',
                        key: 'phone',
                        type: FieldType.TEXT,
                        span: 1,
                    },

                    {
                        label: 'Ngày Sinh',
                        key: 'birthday',
                        type: FieldType.TIME_DATE,
                        span: 1,
                    },

                    {
                        label: 'Created At',
                        key: 'createdAt',
                        type: FieldType.TIME_FULL,
                        span: 1,
                    },
                    {
                        label: 'Updated At',
                        key: 'updatedAt',
                        type: FieldType.TIME_FULL,
                        span: 1,
                    },
                    {
                        label: 'Address',
                        key: 'address',
                        type: FieldType.MULTILINE_TEXT,
                        span: 3,
                    },

                    {
                        label: 'Is Deleted',
                        key: 'isDeleted',
                        type: FieldType.BOOLEAN,
                        span: 1,
                    },
                    {
                        label: 'Status',
                        key: 'status',
                        type: FieldType.BADGE_API,
                        apiAction: userApi.v1GetEnumStatus,
                        span: 1,
                    },
                    {
                        label: 'Is Required Update',
                        key: 'isRequiredUpdate',
                        type: FieldType.BOOLEAN,
                        span: 1,
                    },
                ]}
                record={user.data}
                isFetching={user.isFetching}
                extra={[
                    // ban user
                    <CTAButton
                        key="ban"
                        ctaApi={() => userAdminApi.v1Ban(id)}
                        isConfirm
                        extraOnSuccess={() => {
                            user.refetch();
                        }}
                        confirmMessage={isBanned ? 'Are you sure you want to unban this user?' : 'Are you sure you want to ban this user?'}
                    >
                        <Button
                            type="primary"
                            className={clsx('', {
                                '!bg-green-700': isBanned,
                            })}
                            danger={!isBanned}
                            icon={isBanned ? <CheckCircleOutlined rev="" /> : <ExclamationCircleOutlined rev="" />}
                        >
                            {isBanned ? 'Unban' : 'Ban'} User
                        </Button>
                    </CTAButton>,
                    // <Link href={NKRouter.user.user.edit(id)}>
                    //     <Button icon={<EditOutlined rev="" />}>Cập Nhật</Button>
                    // </Link>,
                ]}
                title="User"
            />
            <div className="">
                <Tabs
                    tabBarStyle={{
                        padding: '0 16px',
                    }}
                    defaultActiveKey="user-wallet"
                    items={[
                        {
                            key: 'user-wallet',
                            label: 'Wallet',
                            children: (
                                <div>
                                    <FieldBuilder<UserWallet>
                                        extra={
                                            <Link href={NKRouter.user.userWallet.detail(userWallet.data?.id || '')}>
                                                <Button type="primary" size="small" icon={<FileSearchOutlined rev="" />}>
                                                    View Transaction
                                                </Button>
                                            </Link>
                                        }
                                        fields={[
                                            {
                                                label: 'Id',
                                                key: 'id',
                                                type: FieldType.UUID,
                                                span: 2,
                                            },
                                            {
                                                label: 'Type',
                                                key: 'type',
                                                type: FieldType.BADGE_API,
                                                span: 1,
                                                apiAction: userWalletApi.v1GetEnumType,
                                            },
                                            {
                                                label: 'Available Balance',
                                                key: 'availableBalance',
                                                type: FieldType.NUMBER,
                                                span: 1,
                                            },
                                            {
                                                label: 'Pending Balance',
                                                key: 'pendingBalance',
                                                type: FieldType.NUMBER,
                                                span: 1,
                                            },
                                            {
                                                label: 'Block Balance',
                                                key: 'blockBalance',
                                                type: FieldType.NUMBER,
                                                span: 1,
                                            },
                                            {
                                                label: 'Created At',
                                                key: 'createdAt',
                                                type: FieldType.TIME_FULL,
                                                span: 1,
                                            },
                                            {
                                                label: 'Updated At',
                                                key: 'updatedAt',
                                                type: FieldType.TIME_FULL,
                                                span: 2,
                                            },
                                        ]}
                                        record={userWallet.data}
                                        isFetching={userWallet.isFetching}
                                        title=""
                                    />
                                </div>
                            ),
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export default Page;
