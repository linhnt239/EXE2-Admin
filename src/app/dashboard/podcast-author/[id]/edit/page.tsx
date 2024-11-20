'use client';

import * as React from 'react';

import { useParams, useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import joi from 'joi';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { MusicAuthorIV1UpdateDto, musicAuthorApi } from '@/core/api/music-author.api';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const router = useRouter();
    const id = _get(params, 'id') as string;

    const podcastAuthor = useQuery(
        ['podcastAuthor', id],
        () => {
            return musicAuthorApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );

    return (
        <div className="max-w-xl">
            {Boolean(podcastAuthor.data) && (
                <FormBuilder<MusicAuthorIV1UpdateDto>
                    apiAction={(dto) => {
                        return musicAuthorApi.v1Update(id, dto);
                    }}
                    schema={{
                        name: joi.string().required(),
                        description: joi.string().required(),
                        thumbnail: joi.string().required(),
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
                            label: 'Thumbnail',
                            name: 'thumbnail',
                            type: NKFormType.UPLOAD_IMAGE,
                            span: 3,
                        },
                    ]}
                    defaultValues={{
                        name: podcastAuthor.data?.name || '',
                        description: podcastAuthor.data?.description || '',
                        thumbnail: podcastAuthor.data?.thumbnail || '',
                    }}
                    title="Update Podcast Author"
                    onExtraSuccessAction={() => {
                        router.push(NKRouter.podcastAuthor.detail(id));
                    }}
                />
            )}
        </div>
    );
};

export default Page;
