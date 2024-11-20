'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { userSubscriptionApi } from '@/core/api/user-subscription.api';
import { FieldType } from '@/core/components/field/FieldDisplay';
import TableBuilder from '@/core/components/table/TableBuilder';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const router = useRouter();

    return (
        <>
            <TableBuilder
                sourceKey="userSubscription"
                title="User Subscription"
                queryApi={userSubscriptionApi.v1Get}
                actionColumns={[
                    {
                        label: 'View Detail',
                        onClick: (record) => {
                            const id = _get(record, 'id');
                            if (id) {
                                router.push(NKRouter.userSubscription.detail(id));
                            }
                        },
                    },
                ]}
                columns={[
                    {
                        title: 'User',
                        key: 'user.name',
                        type: FieldType.TEXT,
                    },
                    {
                        title: 'Subscription name',
                        key: 'subscription.name',
                        type: FieldType.TEXT,
                    },
                    {
                        title: 'Status',
                        key: 'status',
                        type: FieldType.BADGE_API,
                        apiAction: userSubscriptionApi.v1GetEnumStatus,
                    },
                    {
                        title: 'Subscription start date',
                        key: 'startSubscriptionDate',
                        type: FieldType.TIME_FULL,
                    },
                    {
                        title: 'Subscription end date',
                        key: 'endSubscriptionDate',
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
