'use client';

import * as React from 'react';

import { useParams, useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import joi from 'joi';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { SubscriptionIV1UpdateDto, subscriptionApi } from '@/core/api/subscription.api';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const router = useRouter();
    const id = _get(params, 'id') as string;

    const subscription = useQuery(
        ['subscription', id],
        () => {
            return subscriptionApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );

    return (
        <div className="max-w-xl">
            {Boolean(subscription.data) && (
                <FormBuilder<SubscriptionIV1UpdateDto>
                    apiAction={(dto) => {
                        return subscriptionApi.v1Update(id, dto);
                    }}
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
                        name: subscription.data?.name || '',
                        description: subscription.data?.description || '',
                        imageUrls: subscription.data?.imageUrls || [],
                        duration: subscription.data?.duration || 0,
                        index: subscription.data?.index || 0,
                        price: subscription.data?.price || 0,
                    }}
                    title="Update Subscription"
                    onExtraSuccessAction={() => {
                        router.push(NKRouter.subscription.list());
                    }}
                />
            )}
        </div>
    );
};

export default Page;
