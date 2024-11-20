'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import joi from 'joi';

import { NKRouter } from '@/core/NKRouter';
import { ServiceCategoryIV1CreateDto, serviceCategoryApi } from '@/core/api/service-category.api';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const router = useRouter();

    return (
        <div className="max-w-xl">
            <FormBuilder<ServiceCategoryIV1CreateDto>
                apiAction={serviceCategoryApi.v1Create}
                schema={{
                    name: joi.string().required(),
                    description: joi.string().required(),
                    thumbnail: joi.string().required(),
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
                        label: 'Thumbnail',
                        name: 'thumbnail',
                        type: NKFormType.UPLOAD_IMAGE,
                        span: 3,
                    },
                ]}
                defaultValues={{
                    name: '',
                    description: '',
                    thumbnail: '',
                }}
                title="Create Service Category"
                onExtraSuccessAction={() => {
                    router.push(NKRouter.serviceCategory.list());
                }}
            />
        </div>
    );
};

export default Page;
