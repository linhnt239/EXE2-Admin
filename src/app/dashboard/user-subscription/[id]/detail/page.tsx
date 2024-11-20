'use client';

import * as React from 'react';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { userSubscriptionApi } from '@/core/api/user-subscription.api';
import FieldBuilder from '@/core/components/field/FieldBuilder';
import { FieldType } from '@/core/components/field/FieldDisplay';
import { User } from '@/core/models/user';
import { UserSubscription } from '@/core/models/userSubscription';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const id = _get(params, 'id') as string;

    const userSubscription = useQuery(
        ['user subscription', id],
        () => {
            return userSubscriptionApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );
    if (userSubscription.isFetching) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-3xl">
            <FieldBuilder<UserSubscription>
                record={userSubscription.data}
                title="User subscription"
                fields={[
                    {
                        label: 'User',
                        key: '',
                        type: FieldType.LINK,
                        span: 3,
                        apiAction: async (userSubscription: UserSubscription) => {
                            return NKRouter.user.user.detail(userSubscription.user.id);
                        },
                    },
                    {
                        label: 'Subscription name',
                        key: 'subscription.name',
                        type: FieldType.TEXT,
                        span: 3,
                    },
                    {
                        label: 'Status',
                        key: 'status',
                        type: FieldType.BADGE_API,
                        span: 3,
                        apiAction: userSubscriptionApi.v1GetEnumStatus,
                    },
                    {
                        label: 'Subscription start date',
                        key: 'startSubscriptionDate',
                        type: FieldType.TIME_FULL,
                        span: 3,
                    },
                    {
                        label: 'Subscription end date',
                        key: 'endSubscriptionDate',
                        type: FieldType.TIME_FULL,
                        span: 3,
                    },
                    {
                        label: 'Create At',
                        key: 'createdAt',
                        type: FieldType.TIME_FULL,
                        span: 3,
                    },
                    {
                        label: 'Update At',
                        key: 'updatedAt',
                        type: FieldType.TIME_FULL,
                        span: 3,
                    },
                    {
                        label: 'Is Deleted',
                        key: 'isDeleted',
                        type: FieldType.BOOLEAN,
                        span: 3,
                    },
                ]}
            />
        </div>
    );
};

export default Page;
