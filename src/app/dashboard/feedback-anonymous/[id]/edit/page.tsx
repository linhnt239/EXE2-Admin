'use client';

import * as React from 'react';

import { useParams, useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import joi from 'joi';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { FeedbackAnonymousIV1UpdateDto, feedbackAnonymousApi } from '@/core/api/feedback-anonymous.api';
import { FeedbackIV1UpdateDto, feedbackApi } from '@/core/api/feedback.api';
import { MusicAuthorIV1UpdateDto, musicAuthorApi } from '@/core/api/music-author.api';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const router = useRouter();
    const id = _get(params, 'id') as string;

    const feedbackAnonymous = useQuery(
        ['feedbackAnonymous', id],
        () => {
            return feedbackAnonymousApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );

    return (
        <div className="max-w-xl">
            {Boolean(feedbackAnonymous.data) && (
                <FormBuilder<FeedbackAnonymousIV1UpdateDto>
                    apiAction={(dto) => {
                        return feedbackAnonymousApi.v1Put(id, dto);
                    }}
                    schema={{
                        note: joi.string().required(),
                        status: joi.string().required(),
                    }}
                    fields={[
                        {
                            label: 'Status',
                            name: 'status',
                            type: NKFormType.SELECT_API_OPTION,
                            span: 3,
                            useAction: feedbackAnonymousApi.v1GetEnumStatus,
                        },
                        {
                            label: 'Note',
                            name: 'note',
                            type: NKFormType.TEXTAREA,
                            span: 3,
                        },
                    ]}
                    defaultValues={{
                        note: feedbackAnonymous.data?.note || '',
                        status: feedbackAnonymous.data?.status || '',
                    }}
                    title="Update Contact"
                    onExtraSuccessAction={() => {
                        router.push(NKRouter.feedbackAnonymous.detail(id));
                    }}
                />
            )}
        </div>
    );
};

export default Page;
