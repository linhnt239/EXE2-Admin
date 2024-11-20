'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { musicCategoryApi } from '@/core/api/music-category.api';
import { userRoleApi } from '@/core/api/user-role.api';
import CTAButton from '@/core/components/cta/CTABtn';
import FieldBuilder from '@/core/components/field/FieldBuilder';
import { FieldType } from '@/core/components/field/FieldDisplay';
import { MusicCategory } from '@/core/models/musicCategory';
import { UserRole } from '@/core/models/userRole';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const id = _get(params, 'id') as string;

    const userRole = useQuery(
        ['userRole', id],
        () => {
            return userRoleApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );

    return (
        <div className="max-w-3xl">
            <FieldBuilder<UserRole>
                fields={[
                    {
                        label: 'Name',
                        key: 'name',
                        type: FieldType.TEXT,
                        span: 2,
                    },
                    {
                        label: 'Role Index',
                        key: 'index',
                        type: FieldType.TEXT,
                        span: 1,
                    },
                    {
                        label: 'Is Allowed Create',
                        key: 'isAllowedCreate',
                        type: FieldType.BOOLEAN,
                        span: 1,
                    },
                    {
                        label: 'Is Allowed Delete',
                        key: 'isAllowedDelete',
                        type: FieldType.BOOLEAN,
                        span: 2,
                    },
                    {
                        label: 'Is Allowed Edit',
                        key: 'isAllowedEdit',
                        type: FieldType.BOOLEAN,
                        span: 1,
                    },
                    {
                        label: 'Is Allowed View',
                        key: 'isAllowedView',
                        type: FieldType.BOOLEAN,
                        span: 2,
                    },
                    {
                        label: 'Is Approved',
                        key: 'isApproved',
                        type: FieldType.BOOLEAN,
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
                ]}
                isFetching={userRole.isFetching}
                record={userRole.data}
                title="User Role"
            />
        </div>
    );
};

export default Page;
