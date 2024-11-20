'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import joi from 'joi';

import { NKRouter } from '@/core/NKRouter';
import { SubscriptionIV1CreateDto, subscriptionApi } from '@/core/api/subscription.api';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const router = useRouter();

    return (
        <div className="max-w-xl">
            <FormBuilder<SubscriptionIV1CreateDto>
                apiAction={subscriptionApi.v1Create}
                schema={{
                    name: joi.string().required(),
                    description: joi.string().required(),
                    imageUrls: joi.array().items(joi.string()).required(),
                    duration: joi.number().required(),
                    index: joi.number().required(),
                    price: joi.number().required(),
                }}
                fields={[
                    {
                        label: 'Name',
                        name: 'name',
                        type: NKFormType.TEXT,
                        span: 3,
                    },
                    {
                        label: 'Description',
                        name: 'description',
                        type: NKFormType.TEXTAREA,
                        span: 3,
                    },
                    {
                        label: 'Duration',
                        name: 'duration',
                        type: NKFormType.NUMBER,
                        span: 3,
                    },
                    {
                        label: 'Index',
                        name: 'index',
                        type: NKFormType.NUMBER,
                        span: 3,
                    },
                    {
                        label: 'Price',
                        name: 'price',
                        type: NKFormType.NUMBER,
                        span: 3,
                    },
                    {
                        label: 'Image Urls',
                        name: 'imageUrls',
                        type: NKFormType.MULTI_UPLOAD_IMAGE,
                        span: 3,
                    },
                ]}
                defaultValues={{
                    name: '',
                    description: '',
                    imageUrls: [],
                    duration: 0,
                    index: 0,
                    price: 0,
                }}
                title="Create Subscription"
                onExtraSuccessAction={() => {
                    router.push(NKRouter.subscription.list());
                }}
            />
        </div>
    );
};

export default Page;
