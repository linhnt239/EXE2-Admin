'use client';

import * as React from 'react';

import { useParams, useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import joi from 'joi';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { BookingIV1UpdateDto, bookingApi } from '@/core/api/booking.api';
import { productCategoryApi } from '@/core/api/product-category.api';
import { ProductIV1UpdateDto, productApi } from '@/core/api/product.api';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const router = useRouter();
    const id = _get(params, 'id') as string;

    const booking = useQuery(
        ['booking', id],
        () => {
            return bookingApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );

    return (
        <div className="max-w-xl">
            {Boolean(booking.data) && (
                <FormBuilder<BookingIV1UpdateDto>
                    apiAction={(dto) => {
                        return bookingApi.v1Update(id, dto);
                    }}
                    schema={{
                        name: joi.string().required(),
                        description: joi.string().required(),
                        imageUrl: joi.string().required(),
                        status: joi.string().required(),
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
                            label: 'Image Url',
                            name: 'imageUrl',
                            type: NKFormType.UPLOAD_IMAGE,
                            span: 3,
                        },
                        {
                            label: 'Status',
                            name: 'status',
                            type: NKFormType.SELECT_API_OPTION,
                            span: 3,
                            useAction: bookingApi.v1GetEnumStatus,
                        },
                    ]}
                    defaultValues={{
                        name: booking.data?.name || '',
                        description: booking.data?.description || '',
                        imageUrl: booking.data?.imageUrl || '',
                        status: booking.data?.status || '',
                    }}
                    title="Update Expert"
                    onExtraSuccessAction={() => {
                        booking.refetch();
                        router.push(NKRouter.expert.booking.list());
                    }}
                />
            )}
        </div>
    );
};

export default Page;
