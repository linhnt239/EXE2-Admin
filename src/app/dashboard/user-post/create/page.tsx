'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import joi from 'joi';

import { NKRouter } from '@/core/NKRouter';
import { ProductCategoryIV1CreateDto, productCategoryApi } from '@/core/api/product-category.api';
import { UserPostIV1CreateDto, userPostApi } from '@/core/api/user-post.api';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const router = useRouter();

    return (
        <div className="max-w-xl">
            <FormBuilder<UserPostIV1CreateDto>
                apiAction={userPostApi.v1Create}
                schema={{
                    content: joi.string().required(),
                    tag: joi.string().required(),
                }}
                fields={[
                    {
                        label: 'Title',
                        name: 'title',
                        type: NKFormType.TEXT,
                        span: 3,
                    },
                    {
                        label: 'Content',
                        name: 'content',
                        type: NKFormType.RICH_TEXT,
                        span: 3,
                    },

                    {
                        label: 'Tag',
                        name: 'tag',
                        type: NKFormType.TEXT,
                        span: 3,
                    },
                ]}
                defaultValues={{
                    content: '',
                    tag: '',
                }}
                title="Create New Post"
                onExtraSuccessAction={() => {
                    router.push(NKRouter.userPost.list());
                }}
            />
        </div>
    );
};

export default Page;
