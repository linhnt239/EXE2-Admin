'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { musicApi } from '@/core/api/music.api';
import CTAButton from '@/core/components/cta/CTABtn';
import FieldBuilder from '@/core/components/field/FieldBuilder';
import { FieldType } from '@/core/components/field/FieldDisplay';
import { Music } from '@/core/models/music';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
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
    if (podcast.isFetching) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-7xl">
            <FieldBuilder<Music>
                fields={[
                    {
                        label: 'Name',
                        key: 'name',
                        type: FieldType.TEXT,
                        span: 1,
                    },
                    {
                        label: 'Create At',
                        key: 'createAt',
                        type: FieldType.TIME_FULL,
                        span: 1,
                    },
                    {
                        label: 'Update At',
                        key: 'updateAt',
                        type: FieldType.TIME_FULL,
                        span: 1,
                    },
                    {
                        label: 'Author',
                        key: 'musicAuthor.name',
                        type: FieldType.TEXT,
                        span: 1,
                    },
                    {
                        label: 'Category',
                        key: 'musicCategory.name',
                        type: FieldType.TEXT,
                        span: 1,
                    },
                    {
                        label: 'Is Deleted',
                        key: 'isDeleted',
                        type: FieldType.BOOLEAN,
                        span: 1,
                    },

                    {
                        label: 'Point',
                        key: 'point',
                        type: FieldType.NUMBER,
                        span: 3,
                    },
                    {
                        label: 'Description',
                        key: 'description',
                        type: FieldType.TEXT,
                        span: 3,
                    },
                    {
                        label: 'Link',
                        key: 'link',
                        type: FieldType.LINK_BUTTON,
                        span: 3,
                    },
                    {
                        label: 'Thumbnail',
                        key: 'thumbnail',
                        type: FieldType.THUMBNAIL,
                        span: 3,
                    },
                ]}
                extra={
                    <div className="flex items-center gap-4">
                        <CTAButton
                            ctaApi={() => {
                                return musicApi.v1Delete(id);
                            }}
                            isConfirm
                        >
                            <Button danger>Delete</Button>
                        </CTAButton>
                        <Link href={NKRouter.podcast.edit(id)}>
                            <Button>Edit</Button>
                        </Link>
                    </div>
                }
                record={podcast.data}
                title="Podcast"
            />
        </div>
    );
};

export default Page;
