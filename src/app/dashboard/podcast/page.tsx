'use client';

import * as React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button } from 'antd';
import _get from 'lodash/get';
import { toast } from 'react-toastify';

import { NKRouter } from '@/core/NKRouter';
import { musicAuthorApi } from '@/core/api/music-author.api';
import { musicCategoryApi } from '@/core/api/music-category.api';
import { musicApi } from '@/core/api/music.api';
import { FieldType } from '@/core/components/field/FieldDisplay';
import { NKFormType } from '@/core/components/form/NKForm';
import TableBuilder from '@/core/components/table/TableBuilder';
import { FilterComparator } from '@/core/models/common';
import { toastError } from '@/core/utils/api.helper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const router = useRouter();
    const deletePodcast = useMutation(
        (id: string) => {
            return musicApi.v1Delete(id);
        },
        {
            onSuccess: () => {
                toast.success('Delete podcast successfully');
            },
            onError: toastError,
        },
    );

    return (
        <>
            <TableBuilder
                sourceKey="podcast"
                title="Podcast"
                queryApi={musicApi.v1Get}
                extraButtons={
                    <div key="3">
                        <Link href={NKRouter.podcast.create()}>
                            <Button icon={<PlusOutlined rev="" />}>Create New</Button>
                        </Link>
                    </div>
                }
                actionColumns={[
                    {
                        label: 'View Detail',
                        onClick: (record) => {
                            const id = _get(record, 'id');
                            if (id) {
                                router.push(NKRouter.podcast.detail(id));
                            }
                        },
                    },
                    {
                        label: 'Edit',
                        onClick: (record) => {
                            const id = _get(record, 'id');
                            if (id) {
                                router.push(NKRouter.podcast.edit(id));
                            }
                        },
                    },
                    {
                        label: 'Delete',
                        onClick: (record) => {
                            const id = _get(record, 'id');
                            if (id) {
                                deletePodcast.mutate(id);
                            }
                        },
                    },
                ]}
                columns={[
                    {
                        key: 'id',
                        title: 'ID',
                        type: FieldType.UUID,
                    },
                    {
                        title: 'Point',
                        key: 'point',
                        type: FieldType.NUMBER,
                    },
                    {
                        key: 'name',
                        title: 'Name',
                        type: FieldType.TEXT,
                    },
                    {
                        key: 'musicCategory.name',
                        title: 'Category',
                        type: FieldType.TEXT,
                    },
                    {
                        key: 'musicAuthor.name',
                        title: 'Author',
                        type: FieldType.TEXT,
                    },
                    {
                        key: 'link',
                        title: 'Url',
                        type: FieldType.LINK_BUTTON,
                    },
                    {
                        key: 'thumbnail',
                        title: 'Thumbnail',
                        type: FieldType.THUMBNAIL,
                    },
                    {
                        key: 'createdAt',
                        title: 'Created At',
                        type: FieldType.TIME_FULL,
                    },
                ]}
                filters={[
                    {
                        name: 'name',
                        label: 'Name',
                        type: NKFormType.TEXT,
                        comparator: FilterComparator.LIKE,
                        defaultValue: '',
                    },
                    {
                        name: 'musicAuthor.name',
                        label: 'Author',
                        filterName: 'musicAuthor.id',
                        type: NKFormType.SELECT_API_OPTION,
                        comparator: FilterComparator.EQUAL,
                        defaultValue: '',
                        apiAction: musicAuthorApi.v1Select,
                    },
                    {
                        name: 'musicCategory.name',
                        label: 'Category',
                        filterName: 'musicCategory.id',
                        type: NKFormType.SELECT_API_OPTION,
                        comparator: FilterComparator.EQUAL,
                        defaultValue: '',
                        apiAction: musicCategoryApi.v1Select,
                    },
                ]}
            />
        </>
    );
};

export default Page;
