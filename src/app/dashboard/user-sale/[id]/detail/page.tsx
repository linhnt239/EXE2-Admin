'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { musicCategoryApi } from '@/core/api/music-category.api';
import { productCategoryApi } from '@/core/api/product-category.api';
import { userRoleApi } from '@/core/api/user-role.api';
import { userSaleApi } from '@/core/api/user-sale.api';
import CTAButton from '@/core/components/cta/CTABtn';
import FieldBuilder from '@/core/components/field/FieldBuilder';
import { FieldType } from '@/core/components/field/FieldDisplay';
import { MusicCategory } from '@/core/models/musicCategory';
import { UserRole } from '@/core/models/userRole';
import { UserSale } from '@/core/models/userSale';
import { mapListToOptions } from '@/core/utils/api.helper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const id = _get(params, 'id') as string;

    const userSale = useQuery(
        ['userSale', id],
        () => {
            return userSaleApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );

    return (
        <div className="">
            <FieldBuilder<UserSale>
                fields={[
                    {
                        label: 'ID',
                        key: 'id',
                        type: FieldType.UUID,
                        span: 1,
                    },
                    {
                        label: 'Name',
                        key: 'name',
                        type: FieldType.TEXT,
                        span: 1,
                    },
                    {
                        label: 'Price',
                        key: 'price',
                        type: FieldType.NUMBER,
                        span: 1,
                    },
                    {
                        label: 'Owner',
                        key: '',
                        type: FieldType.LINK,
                        span: 3,
                        apiAction: async (userSale: UserSale) => {
                            return {
                                link: NKRouter.user.user.detail(userSale.createdBy.id),
                                label: userSale.createdBy.name,
                            };
                        },
                    },
                    {
                        label: 'Description',
                        key: 'description',
                        type: FieldType.MULTILINE_TEXT,
                        span: 3,
                    },
                    {
                        label: 'Note',
                        key: 'note',
                        type: FieldType.MULTILINE_TEXT,
                        span: 3,
                    },
                    {
                        key: 'productCategory.id',
                        label: 'Product Category',
                        type: FieldType.BADGE_API,
                        apiAction: async () => mapListToOptions(await productCategoryApi.v1Select('', true)),
                        span: 1,
                    },
                    {
                        key: 'status',
                        label: 'Status',
                        type: FieldType.BADGE_API,
                        apiAction: userSaleApi.v1GetEnumStatus,
                        span: 2,
                    },
                    {
                        label: 'Image',
                        key: 'imageUrls',
                        type: FieldType.MULTIPLE_IMAGES,
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
                extra={
                    <div className="flex items-center gap-4">
                        <Link href={NKRouter.userSale.edit(id)}>
                            <Button>Edit</Button>
                        </Link>
                    </div>
                }
                isFetching={userSale.isFetching}
                record={userSale.data}
                title="User Sale Detail"
            />
        </div>
    );
};

export default Page;
