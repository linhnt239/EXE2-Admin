'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import joi from 'joi';

import { NKRouter } from '@/core/NKRouter';
import { MusicAuthorIV1CreateDto, musicAuthorApi } from '@/core/api/music-author.api';
import { musicCategoryApi } from '@/core/api/music-category.api';
import { MusicIV1CreateDto, musicApi } from '@/core/api/music.api';
import CTAUploadFile from '@/core/components/cta/CTAUploadFile';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const router = useRouter();

    return (
        <div className="flex w-full gap-10">
            <div className="w-full max-w-xl">
                <FormBuilder<MusicIV1CreateDto>
                    apiAction={musicApi.v1Create}
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
                        name: '',
                        description: '',
                        thumbnail: '',
                        musicCategoryId: '',
                        musicAuthorId: '',
                        link: '',
                        point: 0,
                    }}
                    title="Create Podcast"
                    onExtraSuccessAction={() => {
                        router.push(NKRouter.podcast.list());
                    }}
                />
            </div>
            <div className="fade-in flex w-full max-w-xl flex-col gap-4 rounded-lg bg-white p-4">
                <div className="text-xl font-bold">Upload audio</div>
                <CTAUploadFile description="Upload audio file for this podcast" />
            </div>
        </div>
    );
};

export default Page;
