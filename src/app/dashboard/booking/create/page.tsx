'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import joi from 'joi';

import { NKRouter } from '@/core/NKRouter';
import { BookingIV1CreateDto, bookingApi } from '@/core/api/booking.api';
import { productCategoryApi } from '@/core/api/product-category.api';
import { ProductIV1CreateDto, productApi } from '@/core/api/product.api';
import { userApi } from '@/core/api/user.api';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const router = useRouter();

    return (
        <div className="max-w-xl">
            <FormBuilder<BookingIV1CreateDto>
                apiAction={bookingApi.v1Create}
                schema={{
                    name: joi.string().required(),
                    description: joi.string().required(),
                    imageUrl: joi.string().required(),
                    age: joi.number().required(),
                    email: joi.string().required(),
                    gender: joi.string().required(),
                    password: joi.string().required(),
                }}
                fields={[
                    {
                        label: 'Name',
                        name: 'name',
                        type: NKFormType.TEXT,
                        span: 3,
                    },
                    {
                        label: 'Email',
                        name: 'email',
                        type: NKFormType.TEXT,
                        span: 3,
                    },
                    {
                        label: 'Password',
                        name: 'password',
                        type: NKFormType.TEXT,
                        span: 3,
                    },
                    {
                        label: 'Age',
                        name: 'age',
                        type: NKFormType.NUMBER,
                        span: 3,
                    },
                    {
                        label: 'Gender',
                        name: 'gender',
                        type: NKFormType.SELECT_API_OPTION,
                        span: 3,
                        useAction: userApi.v1GetEnumGender,
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
                ]}
                defaultValues={{
                    name: '',
                    description: '',
                    age: 0,
                    email: '',
                    gender: '',
                    imageUrl: '',
                    password: '',
                }}
                title="Create Expert"
                onExtraSuccessAction={() => {
                    router.push(NKRouter.booking.list());
                }}
            />
        </div>
    );
};

export default Page;
