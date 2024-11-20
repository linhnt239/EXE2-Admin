'use client';

import * as React from 'react';

import { useParams, useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import joi from 'joi';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { MusicCategoryIV1UpdateDto, musicCategoryApi } from '@/core/api/music-category.api';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const router = useRouter();
    const id = _get(params, 'id') as string;

    const podcastCategory = useQuery(
        ['podcastCategory', id],
        () => {
            return musicCategoryApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );

    return (
        <div className="max-w-xl">
            {Boolean(podcastCategory.data) && (
                <FormBuilder<MusicCategoryIV1UpdateDto>
                    apiAction={(dto) => {
                        return musicCategoryApi.v1Update(id, dto);
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
                        name: podcastCategory.data?.name || '',
                        description: podcastCategory.data?.description || '',
                        thumbnail: podcastCategory.data?.thumbnail || '',
                    }}
                    title="Update Podcast Category"
                    onExtraSuccessAction={() => {
                        router.push(NKRouter.podcastCategory.list());
                    }}
                />
            )}
        </div>
    );
};

export default Page;
