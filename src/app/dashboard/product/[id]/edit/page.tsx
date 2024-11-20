'use client';

import * as React from 'react';

import { useParams, useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import joi from 'joi';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { productCategoryApi } from '@/core/api/product-category.api';
import { ProductIV1UpdateDto, productApi } from '@/core/api/product.api';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const router = useRouter();
    const id = _get(params, 'id') as string;

    const product = useQuery(
        ['product', id],
        () => {
            return productApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );

    return (
        <div className="max-w-xl">
            {Boolean(product.data) && (
                <FormBuilder<ProductIV1UpdateDto>
                    apiAction={(dto) => {
                        return productApi.v1Update(id, dto);
                    }}
                    schema={{
                        name: joi.string().required(),
                        description: joi.string().required(),
                        productCategoryId: joi.string().required(),
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
                            label: 'Category',
                            name: 'productCategoryId',
                            type: NKFormType.SELECT_API_OPTION,
                            useAction: productCategoryApi.v1Select,
                            span: 3,
                        },
                    ]}
                    defaultValues={{
                        name: product.data?.name || '',
                        description: product.data?.description || '',
                        productCategoryId: product.data?.productCategory.id || '',
                    }}
                    title="Update Product"
                    onExtraSuccessAction={() => {
                        router.push(NKRouter.product.detail(id));
                    }}
                />
            )}
        </div>
    );
};

export default Page;
