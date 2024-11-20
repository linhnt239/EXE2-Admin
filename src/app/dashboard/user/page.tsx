'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import _get from 'lodash/get';
import { toast } from 'react-toastify';

import { NKRouter } from '@/core/NKRouter';
import { userAdminApi } from '@/core/api/user-admin.api';
import { userRoleApi } from '@/core/api/user-role.api';
import { userApi } from '@/core/api/user.api';
import { FieldType } from '@/core/components/field/FieldDisplay';
import { NKFormType } from '@/core/components/form/NKForm';
import TableBuilder from '@/core/components/table/TableBuilder';
import { FilterComparator } from '@/core/models/common';
import { mapListToOptions } from '@/core/utils/api.helper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const bannedUserMutation = useMutation(
        async (id: string) => {
            await userAdminApi.v1Ban(id);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries();
                toast.success('Banned user successfully');
            },
        },
    );

    return (
        <>
            <TableBuilder
                sourceKey="user"
                title="User"
                queryApi={userAdminApi.v1Get}
                columns={[
                    {
                        key: 'id',
                        title: 'ID',
                        type: FieldType.UUID,
                    },
                    {
                        key: 'name',
                        title: 'Name',
                        type: FieldType.TEXT,
                    },
                    {
                        key: 'email',
                        title: 'Email',
                        type: FieldType.TEXT,
                    },
                    {
                        key: 'status',
                        title: 'Status',
                        type: FieldType.BADGE_API,
                        apiAction: userApi.v1GetEnumStatus,
                    },
                    {
                        key: 'gender',
                        title: 'Gender',
                        type: FieldType.BADGE_API,
                        apiAction: userApi.v1GetEnumGender,
                    },
                    {
                        key: 'role.id',
                        title: 'Role',
                        type: FieldType.BADGE_API,
                        apiAction: async () => mapListToOptions(await userRoleApi.v1GetSelect('')),
                    },

                    {
                        key: 'createdAt',
                        title: 'Created At',
                        type: FieldType.TIME_FULL,
                    },
                ]}
                actionColumns={[
                    {
                        label: 'View Detail',
                        onClick: (record) => {
                            const id = _get(record, 'id');
                            if (id) {
                                router.push(NKRouter.user.user.detail(id));
                            }
                        },
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
                        name: 'email',
                        label: 'Email',
                        type: NKFormType.TEXT,
                        comparator: FilterComparator.LIKE,
                        defaultValue: '',
                    },
                    {
                        name: 'role.id',
                        label: 'Role',
                        type: NKFormType.SELECT_API_OPTION,
                        comparator: FilterComparator.EQUAL,
                        apiAction: (id) => userRoleApi.v1GetSelect(id),
                        defaultValue: '',
                    },
                ]}
            />
        </>
    );
};

export default Page;
