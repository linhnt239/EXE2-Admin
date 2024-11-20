'use client';

import * as React from 'react';

import { useParams, useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import joi from 'joi';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { productCategoryApi } from '@/core/api/product-category.api';
import { UpdateUserSaleIV1GetByIdDto, userSaleApi } from '@/core/api/user-sale.api';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const router = useRouter();
    const id = _get(params, 'id') as string;

    const userSale = useQuery(
        ['userSale', id],
        () => {
            return userSaleApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );

    return (
        <div className="max-w-xl">
            {Boolean(userSale.data) && (
                <FormBuilder<UpdateUserSaleIV1GetByIdDto>
                    apiAction={(dto) => {
                        return userSaleApi.v1Put(id, dto);
                    }}
                    schema={{
                        name: joi.string().required(),
                        description: joi.string().required(),
                        note: joi.string().required(),
                        status: joi.string().required(),
                        price: joi.number().required(),
                        productCategoryId: joi.string().required(),
                        imageUrls: joi.array().items(joi.string()).required(),
                    }}
                    fields={[
                        {
                            label: 'Name',
                            name: 'name',
                            type: NKFormType.TEXT,
                            span: 3,
                        },
                        {
                            label: 'Price',
                            name: 'price',
                            type: NKFormType.NUMBER,
                            span: 3,
                        },
                        {
                            label: 'Description',
                            name: 'description',
                            type: NKFormType.TEXTAREA,
                            span: 3,
                        },
                        {
                            label: 'Note',
                            name: 'note',
                            type: NKFormType.TEXTAREA,
                            span: 3,
                        },
                        {
                            label: 'Product Category',
                            name: 'productCategoryId',
                            type: NKFormType.SELECT_API_OPTION,
                            span: 3,
                            useAction: productCategoryApi.v1Select,
                        },
                        {
                            label: 'Status',
                            name: 'status',
                            type: NKFormType.SELECT_API_OPTION,
                            span: 3,
                            useAction: userSaleApi.v1GetEnumStatus,
                        },
                        {
                            label: 'Image Urls',
                            name: 'imageUrls',
                            type: NKFormType.MULTI_UPLOAD_IMAGE,
                            span: 3,
                        },
                    ]}
                    defaultValues={{
                        name: userSale.data?.name || '',
                        description: userSale.data?.description || '',
                        note: userSale.data?.note || '',
                        status: userSale.data?.status || '',
                        price: userSale.data?.price || 0,
                        productCategoryId: userSale.data?.productCategory.id || '',
                        imageUrls: userSale.data?.imageUrls || [],
                    }}
                    title="Update User Sale"
                    onExtraSuccessAction={() => {
                        router.push(NKRouter.userSale.detail(id));
                    }}
                />
            )}
        </div>
    );
};

export default Page;
