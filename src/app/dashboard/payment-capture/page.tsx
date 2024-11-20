'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { paymentCaptureApi } from '@/core/api/payment-capture.api';
import { FieldType } from '@/core/components/field/FieldDisplay';
import { NKFormType } from '@/core/components/form/NKForm';
import TableBuilder from '@/core/components/table/TableBuilder';
import { FilterComparator } from '@/core/models/common';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const router = useRouter();

    return (
        <>
            <TableBuilder
                sourceKey="userSale"
                title="Payment Capture"
                queryApi={paymentCaptureApi.v1Get}
                actionColumns={[
                    {
                        label: 'View Detail',
                        onClick: (record) => {
                            const id = _get(record, 'id');
                            if (id) {
                                router.push(NKRouter.paymentCapture.detail(id));
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
                        key: 'hash',
                        title: 'Hash',
                        type: FieldType.UUID,
                    },
                    {
                        key: 'provider',
                        title: 'Provider',
                        type: FieldType.TEXT,
                    },
                    {
                        key: 'amount',
                        title: 'Amount',
                        type: FieldType.NUMBER,
                    },
                    {
                        key: 'content',
                        title: 'Content',
                        type: FieldType.MULTILINE_TEXT,
                    },
                    {
                        key: 'transferTime',
                        title: 'Transfer Time',
                        type: FieldType.TIME_FULL,
                    },

                    {
                        key: 'createdAt',
                        title: 'Created At',
                        type: FieldType.TIME_FULL,
                    },
                ]}
                filters={[
                    {
                        name: 'hash',
                        label: 'Hash',
                        type: NKFormType.TEXT,
                        comparator: FilterComparator.LIKE,
                        defaultValue: '',
                    },
                    {
                        name: 'provider',
                        label: 'Provider',
                        type: NKFormType.TEXT,
                        comparator: FilterComparator.LIKE,
                        defaultValue: '',
                    },
                    {
                        name: 'content',
                        label: 'Content',
                        type: NKFormType.TEXT,
                        comparator: FilterComparator.LIKE,
                        defaultValue: '',
                    },
                    {
                        name: 'createdAt',
                        label: 'Transfer Time',
                        type: NKFormType.DATE_TIME,
                        comparator: FilterComparator.GREATER_THAN_OR_EQUAL,
                        defaultValue: '',
                    },
                ]}
            />
        </>
    );
};

export default Page;
