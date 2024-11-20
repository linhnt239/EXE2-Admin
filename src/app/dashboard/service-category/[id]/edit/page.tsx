'use client';

import * as React from 'react';

import { useParams, useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import joi from 'joi';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { ServiceCategoryIV1UpdateDto, serviceCategoryApi } from '@/core/api/service-category.api';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const router = useRouter();
    const id = _get(params, 'id') as string;

    const serviceCategory = useQuery(
        ['serviceCategory', id],
        () => {
            return serviceCategoryApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );

    return (
        <div className="max-w-xl">
            {Boolean(serviceCategory.data) && (
                <FormBuilder<ServiceCategoryIV1UpdateDto>
                    apiAction={(dto) => {
                        return serviceCategoryApi.v1Update(id, dto);
                    }}
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
                        name: serviceCategory.data?.name || '',
                        description: serviceCategory.data?.description || '',
                        thumbnail: serviceCategory.data?.thumbnail || '',
                    }}
                    title="Update Product Category"
                    onExtraSuccessAction={() => {
                        router.push(NKRouter.serviceCategory.detail(id));
                    }}
                />
            )}
        </div>
    );
};

export default Page;
