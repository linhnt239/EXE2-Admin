'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import joi from 'joi';

import { NKRouter } from '@/core/NKRouter';
import { productCategoryApi } from '@/core/api/product-category.api';
import { ProductIV1CreateDto, productApi } from '@/core/api/product.api';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const router = useRouter();

    return (
        <div className="max-w-xl">
            <FormBuilder<ProductIV1CreateDto>
                apiAction={productApi.v1Create}
                schema={{
                    name: joi.string().required(),
                    description: joi.string().required(),
                    imageUrls: joi.array().items(joi.string()).min(1).required(),
                    price: joi.number().min(0).required(),
                    productCategoryId: joi.string().required(),
                    quantity: joi.number().min(0).required(),
                    isAllowBuyExceedQuantity: joi.boolean().required(),
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
                        label: 'Quantity',
                        name: 'quantity',
                        type: NKFormType.NUMBER,
                        span: 3,
                    },

                    {
                        label: 'Price (VNĐ)',
                        name: 'price',
                        type: NKFormType.NUMBER,

                        span: 3,
                    },
                    {
                        label: 'Category',
                        name: 'productCategoryId',
                        type: NKFormType.SELECT_API_OPTION,
                        useAction: productCategoryApi.v1Select,
                        span: 3,
                    },
                    {
                        label: 'Allow Buy Exceed Quantity',
                        name: 'isAllowBuyExceedQuantity',
                        type: NKFormType.BOOLEAN,
                        span: 3,
                    },
                    {
                        label: 'Images',
                        name: 'imageUrls',
                        type: NKFormType.MULTI_UPLOAD_IMAGE,
                        span: 3,
                    },
                ]}
                defaultValues={{
                    name: '',
                    description: '',
                    imageUrls: [],
                    price: 0,
                    productCategoryId: '',
                    quantity: 0,
                    isAllowBuyExceedQuantity: false,
                }}
                title="Create Product"
                onExtraSuccessAction={() => {
                    router.push(NKRouter.product.list());
                }}
            />
        </div>
    );
};

export default Page;
