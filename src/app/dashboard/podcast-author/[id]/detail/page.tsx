'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { musicAuthorApi } from '@/core/api/music-author.api';
import CTAButton from '@/core/components/cta/CTABtn';
import FieldBuilder from '@/core/components/field/FieldBuilder';
import { FieldType } from '@/core/components/field/FieldDisplay';
import { MusicAuthor } from '@/core/models/musicAuthor';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
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
    if (podcastAuthor.isFetching) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-xl">
            <FieldBuilder<MusicAuthor>
                fields={[
                    {
                        label: 'Name',
                        key: 'name',
                        type: FieldType.TEXT,
                        span: 3,
                    },
                    {
                        label: 'Create At',
                        key: 'createAt',
                        type: FieldType.TIME_FULL,
                        span: 3,
                    },
                    {
                        label: 'Update At',
                        key: 'updateAt',
                        type: FieldType.TIME_FULL,
                        span: 3,
                    },
                    {
                        label: 'Is Deleted',
                        key: 'isDeleted',
                        type: FieldType.BOOLEAN,
                        span: 3,
                    },

                    {
                        label: 'Description',
                        key: 'description',
                        type: FieldType.TEXT,
                        span: 3,
                    },
                    {
                        label: 'Thumbnail',
                        key: 'thumbnail',
                        type: FieldType.THUMBNAIL,
                        span: 3,
                    },
                ]}
                record={podcastAuthor.data}
                extra={
                    <div className="flex items-center gap-4">
                        <CTAButton
                            ctaApi={() => {
                                return musicAuthorApi.v1Delete(id);
                            }}
                            isConfirm
                        >
                            <Button danger>Delete</Button>
                        </CTAButton>
                        <Link href={NKRouter.podcastAuthor.edit(id)}>
                            <Button>Edit</Button>
                        </Link>
                    </div>
                }
                title="Podcast Author"
            />
        </div>
    );
};

export default Page;
