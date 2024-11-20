'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { musicCategoryApi } from '@/core/api/music-category.api';
import CTAButton from '@/core/components/cta/CTABtn';
import FieldBuilder from '@/core/components/field/FieldBuilder';
import { FieldType } from '@/core/components/field/FieldDisplay';
import { MusicCategory } from '@/core/models/musicCategory';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
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
    if (podcastCategory.isFetching) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-xl">
            <FieldBuilder<MusicCategory>
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
                record={podcastCategory.data}
                extra={
                    <div className="flex items-center gap-4">
                        <CTAButton
                            ctaApi={() => {
                                return musicCategoryApi.v1Delete(id);
                            }}
                            isConfirm
                        >
                            <Button danger>Delete</Button>
                        </CTAButton>
                        <Link href={NKRouter.podcastCategory.edit(id)}>
                            <Button>Edit</Button>
                        </Link>
                    </div>
                }
                title="Podcast Category"
            />
        </div>
    );
};

export default Page;
