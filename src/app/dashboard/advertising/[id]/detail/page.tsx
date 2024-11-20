'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { advertisingApi } from '@/core/api/advertising.api';
import FieldBuilder from '@/core/components/field/FieldBuilder';
import { FieldType } from '@/core/components/field/FieldDisplay';
import { Advertising } from '@/core/models/advertising';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const id = _get(params, 'id') as string;

    const advertising = useQuery(['advertising', id], () => {
        return advertisingApi.v1GetById(id);
    });
    if (advertising.isFetching) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full">
            <FieldBuilder<Advertising>
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
                        label: 'Description',
                        key: 'description',
                        type: FieldType.TEXT,
                        span: 2,
                    },
                    {
                        label: 'Cycle Time',
                        key: 'cycleTime',
                        type: FieldType.NUMBER,
                        span: 1,
                    },
                    {
                        label: 'Slug',
                        key: 'slug',
                        type: FieldType.TEXT,
                        span: 1,
                    },
                    {
                        label: 'Group',
                        key: 'group',
                        type: FieldType.TEXT,
                        span: 1,
                    },
                    {
                        label: 'Default',
                        key: 'default',
                        type: FieldType.TEXT,
                        span: 3,
                    },
                    {
                        label: 'Contents',
                        key: 'contents',
                        type: FieldType.MULTIPLE_IMAGES,
                        span: 3,
                    },
                ]}
                record={advertising.data}
                extra={
                    <div className="flex items-center gap-4">
                        <Link href={NKRouter.advertising.edit(id)}>
                            <Button>Edit</Button>
                        </Link>
                    </div>
                }
                title="Banner Detail"
            />
        </div>
    );
};

export default Page;
