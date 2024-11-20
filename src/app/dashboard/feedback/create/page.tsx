'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import joi from 'joi';

import { NKRouter } from '@/core/NKRouter';
import { FeedbackIV1CreateDto, feedbackApi } from '@/core/api/feedback.api';
import { MusicAuthorIV1CreateDto, musicAuthorApi } from '@/core/api/music-author.api';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const router = useRouter();

    return (
        <div className="max-w-xl">
            <FormBuilder<FeedbackIV1CreateDto>
                apiAction={feedbackApi.v1Create}
                schema={{
                    name: joi.string().required(),
                    code: joi.string().required(),
                    isActive: joi.boolean().required(),
                    description: joi.string().required(),
                }}
                fields={[
                    {
                        label: 'Name',
                        name: 'name',
                        type: NKFormType.TEXT,
                        span: 3,
                    },
                    {
                        label: 'Code',
                        name: 'code',
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
                        label: 'Is Active',
                        name: 'isActive',
                        type: NKFormType.BOOLEAN,
                        span: 3,
                    },
                ]}
                defaultValues={{
                    name: '',
                    code: '',
                    isActive: true,
                    description: '',
                }}
                title="Create Test"
                onExtraSuccessAction={() => {
                    router.push(NKRouter.feedback.list());
                }}
            />
        </div>
    );
};

export default Page;
