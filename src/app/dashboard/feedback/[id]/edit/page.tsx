'use client';

import * as React from 'react';

import { useParams, useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import joi from 'joi';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { FeedbackIV1UpdateDto, feedbackApi } from '@/core/api/feedback.api';
import { MusicAuthorIV1UpdateDto, musicAuthorApi } from '@/core/api/music-author.api';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const router = useRouter();
    const id = _get(params, 'id') as string;

    const feedback = useQuery(
        ['feedback', id],
        () => {
            return feedbackApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );

    return (
        <div className="max-w-xl">
            {Boolean(feedback.data) && (
                <FormBuilder<FeedbackIV1UpdateDto>
                    apiAction={(dto) => {
                        return feedbackApi.v1Update(id, dto);
                    }}
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
                        name: feedback.data?.name || '',
                        description: feedback.data?.description || '',
                        code: feedback.data?.code || '',
                        isActive: feedback.data?.isActive || true,
                    }}
                    title="Update Test"
                    onExtraSuccessAction={() => {
                        router.push(NKRouter.feedback.detail(id));
                    }}
                />
            )}
        </div>
    );
};

export default Page;
