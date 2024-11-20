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
import { feedbackApi } from '@/core/api/feedback.api';
import { orderDiscountApi } from '@/core/api/order-discount.api';
import { productCategoryApi } from '@/core/api/product-category.api';
import { userTicketApi } from '@/core/api/user-ticket.api';
import { userWalletApi } from '@/core/api/user-wallet.api';
import { userApi } from '@/core/api/user.api';
import { FieldType } from '@/core/components/field/FieldDisplay';
import { NKFormType } from '@/core/components/form/NKForm';
import TableBuilder from '@/core/components/table/TableBuilder';
import { FilterComparator } from '@/core/models/common';
import { UserWallet } from '@/core/models/userWallet';
import { toastError } from '@/core/utils/api.helper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const router = useRouter();

    return (
        <>
            <TableBuilder
                sourceKey="userWallet"
                title="User Wallet"
                queryApi={userWalletApi.v1Get}
                actionColumns={[
                    {
                        label: 'View Detail',
                        onClick: (record) => {
                            const id = _get(record, 'id');
                            if (id) {
                                router.push(NKRouter.user.userWallet.detail(id));
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
                        key: '',
                        title: 'Owner',
                        type: FieldType.LINK,
                        apiAction: async (userWallet: UserWallet) => {
                            return {
                                link: NKRouter.user.user.detail(userWallet.user.id),
                                label: userWallet.user.name,
                            };
                        },
                    },

                    {
                        key: 'availableBalance',
                        title: 'Available Balance',
                        type: FieldType.NUMBER,
                    },
                    {
                        key: 'pendingBalance',
                        title: 'Pending Balance',
                        type: FieldType.NUMBER,
                    },
                    {
                        key: 'blockBalance',
                        title: 'Block Balance',
                        type: FieldType.NUMBER,
                    },
                    {
                        key: 'updatedAt',
                        title: 'Updated At',
                        type: FieldType.TIME_FULL,
                    },
                ]}
            />
        </>
    );
};

export default Page;
