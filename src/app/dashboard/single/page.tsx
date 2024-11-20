'use client';

import * as React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import joi from 'joi';
import _get from 'lodash/get';
import { toast } from 'react-toastify';

import { NKRouter } from '@/core/NKRouter';
import { productCategoryApi } from '@/core/api/product-category.api';
import { SingleIV1UpdateDto, singleApi } from '@/core/api/single.api';
import { FieldType } from '@/core/components/field/FieldDisplay';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';
import TableBuilder from '@/core/components/table/TableBuilder';
import { FilterComparator } from '@/core/models/common';
import { toastError } from '@/core/utils/api.helper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const userSaleBookingCommission = useQuery(
        ['USER_SALE_BOOKING_COMMISSION'],
        () => {
            return singleApi.v1GetByScopeAndName('UserMeSaleBookingOrderService', 'USER_SALE_BOOKING_COMMISSION');
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );

    return (
        <div className="flex  max-w-3xl gap-4">
            <FormBuilder<SingleIV1UpdateDto>
                apiAction={(dto) => {
                    return singleApi.v1Put(userSaleBookingCommission.data?.id || '', {
                        value: String(dto.value),
                    });
                }}
                defaultValues={{
                    value: userSaleBookingCommission.data?.value || '',
                }}
                schema={{
                    value: joi.number().min(0).max(100).required(),
                }}
                title="Commission"
                fields={[
                    {
                        label: 'Percent (%)',
                        name: 'value',
                        type: NKFormType.NUMBER,
                        span: 3,
                    },
                ]}
                isFetching={userSaleBookingCommission.isFetching}
            ></FormBuilder>
        </div>
    );
};

export default Page;
