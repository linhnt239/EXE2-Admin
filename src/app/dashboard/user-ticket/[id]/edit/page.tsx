'use client';

import * as React from 'react';

import { useParams, useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import joi from 'joi';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { OrderDiscountIV1UpdateDto, orderDiscountApi } from '@/core/api/order-discount.api';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const router = useRouter();
    const id = _get(params, 'id') as string;

    const orderDiscount = useQuery(
        ['orderDiscount', id],
        () => {
            return orderDiscountApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );

    return (
        <div className="max-w-xl">
            {Boolean(orderDiscount.data) && (
                <FormBuilder<OrderDiscountIV1UpdateDto>
                    apiAction={(dto) => {
                        return orderDiscountApi.v1Update(id, dto);
                    }}
                    schema={{
                        name: joi.string().required(),
                        code: joi.string().required(),
                        isActive: joi.boolean().required(),
                        activeDate: joi.date().required(),
                        expiredDate: joi.date().required(),
                        numberOfUsed: joi.number().required(),
                        type: joi.string().required(),
                        value: joi.number().min(0).required(),
                    }}
                    fields={[
                        {
                            label: 'Name',
                            name: 'name',
                            type: NKFormType.TEXT,
                            span: 3,
                        },
                        {
                            label: 'Code',
                            name: 'code',
                            type: NKFormType.TEXT,
                            span: 3,
                        },
                        {
                            label: 'Value',
                            name: 'value',
                            type: NKFormType.NUMBER,
                            span: 3,
                        },
                        {
                            label: 'Type',
                            name: 'type',
                            type: NKFormType.SELECT_API_OPTION,
                            span: 3,
                            useAction: orderDiscountApi.v1GetEnumType,
                        },
                        {
                            label: 'Number of Used',
                            name: 'numberOfUsed',
                            type: NKFormType.NUMBER,
                            span: 3,
                        },
                        {
                            label: 'Active Date',
                            name: 'activeDate',
                            type: NKFormType.DATE_TIME,
                            span: 3,
                        },
                        {
                            label: 'Expired Date',
                            name: 'expiredDate',
                            type: NKFormType.DATE_TIME,
                            span: 3,
                        },
                        {
                            label: 'Is Active',
                            name: 'isActive',
                            type: NKFormType.BOOLEAN,
                            span: 3,
                        },
                    ]}
                    defaultValues={{
                        name: orderDiscount.data?.name || '',

                        code: orderDiscount.data?.code || '',
                        isActive: orderDiscount.data?.isActive || true,
                        activeDate: orderDiscount.data?.activeDate || '',
                        expiredDate: orderDiscount.data?.expiredDate || '',
                        numberOfUsed: orderDiscount.data?.numberOfUsed || 0,
                        type: orderDiscount.data?.type || '',
                        value: orderDiscount.data?.value || 0,
                    }}
                    title="Update Discount"
                    onExtraSuccessAction={() => {
                        router.push(NKRouter.orderDiscount.detail(id));
                    }}
                />
            )}
        </div>
    );
};

export default Page;
