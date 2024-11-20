'use client';

import * as React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { advertisingApi } from '@/core/api/advertising.api';
import { FieldType } from '@/core/components/field/FieldDisplay';
import { NKFormType } from '@/core/components/form/NKForm';
import TableBuilder from '@/core/components/table/TableBuilder';
import { FilterComparator } from '@/core/models/common';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const router = useRouter();

    return (
        <>
            <TableBuilder
                sourceKey="advertising"
                title="Banner"
                queryApi={advertisingApi.v1Get}
                extraButtons={
                    <div key="3">
                        <Link href={NKRouter.advertising.create()}>
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
                                router.push(NKRouter.advertising.detail(id));
                            }
                        },
                    },
                    {
                        label: 'Edit',
                        onClick: (record) => {
                            const id = _get(record, 'id');
                            if (id) {
                                router.push(NKRouter.advertising.edit(id));
                            }
                        },
                    },
                ]}
                columns={[
                    {
                        title: 'Name',
                        key: 'name',
                        type: FieldType.TEXT,
                    },

                    {
                        title: 'Description',
                        key: 'description',
                        type: FieldType.TEXT,
                    },
                    {
                        title: 'Cycle Time',
                        key: 'cycleTime',
                        type: FieldType.NUMBER,
                    },
                    {
                        title: 'Slug',
                        key: 'slug',
                        type: FieldType.TEXT,
                    },
                    {
                        title: 'Group',
                        key: 'group',
                        type: FieldType.TEXT,
                    },

                    {
                        title: 'Contents',
                        key: 'contents',
                        type: FieldType.MULTIPLE_IMAGES,
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
                ]}
            />
        </>
    );
};

export default Page;
