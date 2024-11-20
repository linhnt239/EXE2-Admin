'use client';

import * as React from 'react';

import { useParams, useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import joi from 'joi';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { ProductCategoryIV1UpdateDto, productCategoryApi } from '@/core/api/product-category.api';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const router = useRouter();
    const id = _get(params, 'id') as string;

    const productCategory = useQuery(
        ['productCategory', id],
        () => {
            return productCategoryApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );

    return (
        <div className="max-w-xl">
            {Boolean(productCategory.data) && (
                <FormBuilder<ProductCategoryIV1UpdateDto>
                    apiAction={(dto) => {
                        return productCategoryApi.v1Update(id, dto);
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
                        name: productCategory.data?.name || '',
                        description: productCategory.data?.description || '',
                        thumbnail: productCategory.data?.thumbnail || '',
                    }}
                    title="Update Product Category"
                    onExtraSuccessAction={() => {
                        router.push(NKRouter.productCategory.detail(id));
                    }}
                />
            )}
        </div>
    );
};

export default Page;
