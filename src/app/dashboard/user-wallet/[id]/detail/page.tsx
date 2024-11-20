'use client';

import * as React from 'react';

import { useParams, useRouter } from 'next/navigation';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import joi from 'joi';
import _get from 'lodash/get';
import { Airplay, ChevronRightSquare } from 'lucide-react';
import moment from 'moment';

import { NKRouter } from '@/core/NKRouter';
import {
    UserWalletTransactionIV1AdminDepositBalance,
    UserWalletTransactionIV1AdminWithdrawBalance,
    userWalletTransactionApi,
} from '@/core/api/user-wallet-transaction.api';
import { userWalletApi } from '@/core/api/user-wallet.api';
import FieldBuilder from '@/core/components/field/FieldBuilder';
import { FieldType } from '@/core/components/field/FieldDisplay';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';
import ModalBuilder from '@/core/components/modal/ModalBuilder';
import TableBuilder from '@/core/components/table/TableBuilder';
import { FilterComparator } from '@/core/models/common';
import { UserWallet } from '@/core/models/userWallet';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const params = useParams();
    const id = _get(params, 'id') as string;

    const userWallet = useQuery(
        ['user-wallet', id],
        () => {
            return userWalletApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );

    return (
        <>
            <div className="w-full">
                <FieldBuilder<UserWallet>
                    extra={
                        <div className="flex gap-2">
                            <ModalBuilder
                                modalTitle=""
                                btnProps={{
                                    type: 'primary',
                                    className: 'flex items-center',

                                    icon: <Airplay size={'16'} />,
                                    size: 'small',
                                }}
                                btnLabel={'Deposit Balance'}
                            >
                                <FormBuilder<UserWalletTransactionIV1AdminDepositBalance>
                                    apiAction={userWalletTransactionApi.v1AdminDepositBalance}
                                    schema={{
                                        amount: joi.number().required().min(0),
                                        userId: joi.string().required(),
                                    }}
                                    isDebug
                                    fields={[
                                        {
                                            label: 'Amount',
                                            type: NKFormType.NUMBER,
                                            span: 1,
                                            name: 'amount',
                                        },
                                    ]}
                                    defaultValues={{
                                        userId: userWallet.data?.user.id || '',
                                        amount: 0,
                                    }}
                                    title="Deposit Balance"
                                    onExtraSuccessAction={() => {
                                        userWallet.refetch();
                                        queryClient.invalidateQueries(['userWalletTransaction']);
                                    }}
                                />
                            </ModalBuilder>
                            <ModalBuilder
                                modalTitle=""
                                btnProps={{
                                    type: 'primary',
                                    className: 'flex items-center',
                                    danger: true,
                                    icon: <ChevronRightSquare size={'16'} />,
                                    size: 'small',
                                }}
                                btnLabel={'Withdraw Balance'}
                            >
                                <FormBuilder<UserWalletTransactionIV1AdminWithdrawBalance>
                                    apiAction={userWalletTransactionApi.v1AdminWithdrawBalance}
                                    schema={{
                                        amount: joi.number().required().min(0),
                                        userId: joi.string().required(),
                                    }}
                                    isDebug
                                    fields={[
                                        {
                                            label: 'Amount',
                                            type: NKFormType.NUMBER,
                                            span: 1,
                                            name: 'amount',
                                        },
                                    ]}
                                    defaultValues={{
                                        userId: userWallet.data?.user.id || '',
                                        amount: 0,
                                    }}
                                    title="Withdraw Balance"
                                    onExtraSuccessAction={() => {
                                        userWallet.refetch();
                                        queryClient.invalidateQueries(['userWalletTransaction']);
                                    }}
                                />
                            </ModalBuilder>
                        </div>
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
                            label: 'Owner',
                            key: '',
                            type: FieldType.LINK,
                            span: 3,
                            apiAction: async (userWallet: UserWallet) => {
                                return {
                                    link: NKRouter.user.user.detail(userWallet.user.id),
                                    label: userWallet.user.name,
                                };
                            },
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
                    title="User Wallet Detail"
                />
                <TableBuilder
                    sourceKey="userWalletTransaction"
                    title="User Wallet Transaction"
                    queryApi={(params) => {
                        return userWalletTransactionApi.v1GetByWallet(id, params);
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
