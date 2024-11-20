'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import joi from 'joi';
import moment from 'moment';

import { NKRouter } from '@/core/NKRouter';
import { FeedbackIV1CreateDto, feedbackApi } from '@/core/api/feedback.api';
import { MusicAuthorIV1CreateDto, musicAuthorApi } from '@/core/api/music-author.api';
import { OrderDiscountIV1CreateDto, orderDiscountApi } from '@/core/api/order-discount.api';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const router = useRouter();

    return (
        <div className="max-w-xl">
            <FormBuilder<OrderDiscountIV1CreateDto>
                apiAction={orderDiscountApi.v1Create}
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
                    name: '',
                    code: '',
                    isActive: true,
                    activeDate: new Date().toString(),
                    expiredDate: new Date().toString(),
                    numberOfUsed: 0,
                    type: '',
                    value: 0,
                }}
                title="Create Discount"
                onExtraSuccessAction={() => {
                    router.push(NKRouter.orderDiscount.list());
                }}
            />
        </div>
    );
};

export default Page;
