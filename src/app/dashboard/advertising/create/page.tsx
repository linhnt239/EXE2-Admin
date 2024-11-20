'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import joi from 'joi';

import { NKRouter } from '@/core/NKRouter';
import { AdvertisingIV1CreateDto, advertisingApi } from '@/core/api/advertising.api';
import FieldDisplay, { FieldType } from '@/core/components/field/FieldDisplay';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const router = useRouter();

    return (
        <div className="max-w-xl">
            <FormBuilder<AdvertisingIV1CreateDto>
                apiAction={advertisingApi.v1Create}
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
                    name: '',
                    default: '',
                    group: '',
                    slug: '',
                    description: '',
                    contents: [],
                    cycleTime: 100,
                    type: 'banner',
                }}
                title="Create Banner"
                onExtraSuccessAction={() => {
                    router.push(NKRouter.advertising.list());
                }}
            />
        </div>
    );
};

export default Page;
