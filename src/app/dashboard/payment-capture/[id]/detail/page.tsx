'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { musicCategoryApi } from '@/core/api/music-category.api';
import { paymentCaptureApi } from '@/core/api/payment-capture.api';
import { productCategoryApi } from '@/core/api/product-category.api';
import { userRoleApi } from '@/core/api/user-role.api';
import { userSaleApi } from '@/core/api/user-sale.api';
import CTAButton from '@/core/components/cta/CTABtn';
import FieldBuilder from '@/core/components/field/FieldBuilder';
import { FieldType } from '@/core/components/field/FieldDisplay';
import { MusicCategory } from '@/core/models/musicCategory';
import { PaymentCapture } from '@/core/models/payment-capture';
import { UserRole } from '@/core/models/userRole';
import { UserSale } from '@/core/models/userSale';
import { mapListToOptions } from '@/core/utils/api.helper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const id = _get(params, 'id') as string;

    const userSale = useQuery(
        ['payment-capture', id],
        () => {
            return paymentCaptureApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );

    return (
        <div className="max-w-2xl">
            <FieldBuilder<PaymentCapture>
                fields={[
                    {
                        label: 'ID',
                        key: 'id',
                        type: FieldType.UUID,
                        span: 3,
                    },
                    {
                        label: 'Hash',
                        key: 'hash',
                        type: FieldType.TEXT,
                        span: 3,
                    },
                    {
                        label: 'Provider',
                        key: 'provider',
                        type: FieldType.TEXT,
                        span: 3,
                    },
                    {
                        label: 'Content',
                        key: 'content',
                        type: FieldType.TEXT,
                        span: 3,
                    },
                    {
                        label: 'Transfer Time',
                        key: 'transferTime',
                        type: FieldType.TIME_FULL,
                        span: 3,
                    },
                    {
                        label: 'Amount',
                        key: 'amount',
                        type: FieldType.NUMBER,
                        span: 3,
                    },

                    {
                        label: 'Create At',
                        key: 'createAt',
                        type: FieldType.TIME_FULL,
                        span: 3,
                    },
                    {
                        label: 'Update At',
                        key: 'updateAt',
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
                isFetching={userSale.isFetching}
                record={userSale.data}
                title="Payment Capture Detail"
            />
        </div>
    );
};

export default Page;
