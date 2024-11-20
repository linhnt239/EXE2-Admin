'use client';

import * as React from 'react';

import { useParams, useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import joi from 'joi';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { AdvertisingIV1UpdateDto, advertisingApi } from '@/core/api/advertising.api';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const router = useRouter();
    const id = _get(params, 'id') as string;

    const advertising = useQuery(
        ['advertising', id],
        () => {
            return advertisingApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );

    return (
        <div className="max-w-xl">
            {Boolean(advertising.data) && (
                <FormBuilder<AdvertisingIV1UpdateDto>
                    apiAction={(dto) => {
                        return advertisingApi.v1Update(id, dto);
                    }}
                    schema={{
                        name: joi.string().required(),
                        description: joi.string().required(),
                        contents: joi.array().required(),
                        cycleTime: joi.number().required(),
                        default: joi.string().required(),
                        group: joi.string().required(),
                        slug: joi.string().required(),
                        type: joi.string().required(),
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
                            label: 'Slug',
                            name: 'slug',
                            type: NKFormType.TEXT,
                            span: 3,
                        },
                        {
                            label: 'Group',
                            name: 'group',
                            type: NKFormType.TEXT,
                            span: 3,
                        },
                        {
                            label: 'Default',
                            name: 'default',
                            type: NKFormType.TEXT,
                            span: 3,
                        },
                        {
                            label: 'Contents',
                            name: 'contents',
                            type: NKFormType.MULTI_UPLOAD_IMAGE,
                            span: 3,
                        },
                        {
                            label: 'Cycle Time',
                            name: 'cycleTime',
                            type: NKFormType.NUMBER,
                            span: 3,
                        },
                    ]}
                    defaultValues={{
                        name: advertising.data?.name || '',
                        default: advertising.data?.default || '',
                        group: advertising.data?.group || '',
                        slug: advertising.data?.slug || '',
                        description: advertising.data?.description || '',
                        contents: advertising.data?.contents || [],
                        cycleTime: advertising.data?.cycleTime || 100,
                        type: 'banner',
                    }}
                    title="Update Banner"
                    onExtraSuccessAction={() => {
                        advertising.refetch();
                        router.push(NKRouter.advertising.detail(id));
                    }}
                />
            )}
        </div>
    );
};

export default Page;
