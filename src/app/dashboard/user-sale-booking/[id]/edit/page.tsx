'use client';

import * as React from 'react';

import { useParams, useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import joi from 'joi';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { serviceCategoryApi } from '@/core/api/service-category.api';
import { UserSaleBookingIV1Update, userSaleBookingApi } from '@/core/api/user-sale-booking.api';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const router = useRouter();
    const id = _get(params, 'id') as string;

    const userSaleBooking = useQuery(
        ['userSaleBooking', id],
        () => {
            return userSaleBookingApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );

    return (
        <div className="max-w-xl">
            {Boolean(userSaleBooking.data) && (
                <FormBuilder<UserSaleBookingIV1Update>
                    apiAction={(dto) => {
                        return userSaleBookingApi.v1Put(id, dto);
                    }}
                    schema={{
                        name: joi.string().required(),
                        description: joi.string().required(),
                        note: joi.string().required(),
                        status: joi.string().required(),
                        price: joi.number().required(),
                        serviceCategoryId: joi.string().required(),
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
                            label: 'Service Category',
                            name: 'serviceCategoryId',
                            type: NKFormType.SELECT_API_OPTION,
                            span: 3,
                            useAction: serviceCategoryApi.v1Select,
                        },
                        {
                            label: 'Status',
                            name: 'status',
                            type: NKFormType.SELECT_API_OPTION,
                            span: 3,
                            useAction: userSaleBookingApi.v1GetEnumStatus,
                        },
                        {
                            label: 'Image Urls',
                            name: 'imageUrls',
                            type: NKFormType.MULTI_UPLOAD_IMAGE,
                            span: 3,
                        },
                    ]}
                    defaultValues={{
                        name: userSaleBooking.data?.name || '',
                        description: userSaleBooking.data?.description || '',
                        note: userSaleBooking.data?.note || '',
                        status: userSaleBooking.data?.status || '',
                        price: userSaleBooking.data?.price || 0,
                        serviceCategoryId: userSaleBooking.data?.serviceCategory.id || '',
                        imageUrls: userSaleBooking.data?.imageUrls || [],
                    }}
                    title="Update User Sale"
                    onExtraSuccessAction={() => {
                        router.push(NKRouter.userSaleBooking.detail(id));
                    }}
                />
            )}
        </div>
    );
};

export default Page;
