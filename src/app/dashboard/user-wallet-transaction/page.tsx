'use client';

import * as React from 'react';

import { useParams, useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import moment from 'moment';

import { NKRouter } from '@/core/NKRouter';
import { userWalletTransactionApi } from '@/core/api/user-wallet-transaction.api';
import { FieldType } from '@/core/components/field/FieldDisplay';
import { NKFormType } from '@/core/components/form/NKForm';
import TableBuilder from '@/core/components/table/TableBuilder';
import { FilterComparator } from '@/core/models/common';
import { UserWalletTransaction } from '@/core/models/userWalletTransaction';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const params = useParams();

    return (
        <>
            <div className="w-full">
                <TableBuilder
                    sourceKey="userWalletTransaction"
                    title="User Wallet Transaction"
                    queryApi={(params) => {
                        return userWalletTransactionApi.v1Get(params);
                    }}
                    columns={[
                        {
                            key: 'id',
                            title: 'ID',
                            type: FieldType.UUID,
                        },
                        {
                            key: 'amount',
                            title: 'Amount',
                            type: FieldType.NUMBER,
                        },
                        {
                            key: 'type',
                            title: 'Type',
                            type: FieldType.BADGE_API,
                            apiAction: userWalletTransactionApi.v1GetEnumType,
                        },
                        {
                            key: 'status',
                            title: 'Status',
                            type: FieldType.BADGE_API,
                            apiAction: userWalletTransactionApi.v1GetEnumStatus,
                        },
                        {
                            title: 'Wallet',
                            key: '',
                            type: FieldType.LINK,

                            apiAction: async (userWalletTransaction: UserWalletTransaction) => {
                                return {
                                    link: NKRouter.user.userWallet.detail(userWalletTransaction.userWallet.id),
                                    label: userWalletTransaction.userWallet.user.name,
                                };
                            },
                        },

                        {
                            key: 'createdAt',
                            title: 'Created At',
                            type: FieldType.TIME_FULL,
                        },
                        {
                            key: 'updatedAt',
                            title: 'Updated At',
                            type: FieldType.TIME_FULL,
                        },
                    ]}
                    filters={[
                        {
                            name: 'createdAt',
                            label: 'Created At',
                            type: NKFormType.DATE,
                            comparator: FilterComparator.GREATER_THAN_OR_EQUAL,
                            defaultValue: moment().format('YYYY-MM-DD'),
                        },
                        {
                            name: 'status',
                            label: 'Status',
                            type: NKFormType.SELECT_API_OPTION,
                            comparator: FilterComparator.EQUAL,
                            apiAction: (id) => userWalletTransactionApi.v1GetEnumStatus(),
                            defaultValue: '',
                        },
                        {
                            name: 'type',
                            label: 'Type',
                            type: NKFormType.SELECT_API_OPTION,
                            comparator: FilterComparator.EQUAL,
                            apiAction: (id) => userWalletTransactionApi.v1GetEnumType(),
                            defaultValue: '',
                        },
                    ]}
                />
            </div>
        </>
    );
};

export default Page;
