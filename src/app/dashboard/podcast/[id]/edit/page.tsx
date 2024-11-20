'use client';

import * as React from 'react';

import { useParams, useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import joi from 'joi';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { musicAuthorApi } from '@/core/api/music-author.api';
import { musicCategoryApi } from '@/core/api/music-category.api';
import { MusicIV1UpdateDto, musicApi } from '@/core/api/music.api';
import CTAUploadFile from '@/core/components/cta/CTAUploadFile';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const router = useRouter();
    const id = _get(params, 'id') as string;

    const podcast = useQuery(
        ['podcast', id],
        () => {
            return musicApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );

    return (
        <div className="flex w-full gap-10">
            <div className="w-full max-w-xl">
                {Boolean(podcast.data) && (
                    <FormBuilder<MusicIV1UpdateDto>
                        apiAction={(dto) => {
                            return musicApi.v1Update(id, dto);
                        }}
                        schema={{
                            name: joi.string().required(),
                            description: joi.string().required(),
                            thumbnail: joi.string().required(),
                            musicCategoryId: joi.string().required(),
                            musicAuthorId: joi.string().required(),
                            link: joi.string().required(),
                            point: joi.number().required(),
                        }}
                        fields={[
                            {
                                label: 'Name',
                                name: 'name',
                                type: NKFormType.TEXT,
                                span: 3,
                            },
                            {
                                label: 'Point',
                                name: 'point',
                                type: NKFormType.NUMBER,
                                span: 3,
                            },
                            {
                                label: 'Link',
                                name: 'link',
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
                            {
                                label: 'Podcast Category',
                                name: 'musicCategoryId',
                                type: NKFormType.SELECT_API_OPTION,
                                span: 3,
                                useAction: musicCategoryApi.v1Select,
                            },
                            {
                                label: 'Podcast Author',
                                name: 'musicAuthorId',
                                type: NKFormType.SELECT_API_OPTION,
                                span: 3,
                                useAction: musicAuthorApi.v1Select,
                            },
                        ]}
                        defaultValues={{
                            name: podcast.data?.name || '',
                            description: podcast.data?.description || '',
                            thumbnail: podcast.data?.thumbnail || '',
                            musicCategoryId: podcast.data?.musicCategory.id || '',
                            musicAuthorId: podcast.data?.musicAuthor.id || '',
                            link: podcast.data?.link || '',
                            point: podcast.data?.point || 0,
                        }}
                        title="Update Podcast"
                        onExtraSuccessAction={() => {
                            router.push(NKRouter.podcast.detail(id));
                        }}
                    />
                )}
            </div>
            <div className="fade-in flex w-full max-w-xl flex-col gap-4 rounded-lg bg-white p-4">
                <div className="text-xl font-bold">Upload audio</div>
                <CTAUploadFile description="Upload audio file for this podcast" />
            </div>
        </div>
    );
};

export default Page;
