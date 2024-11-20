'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { productCategoryApi } from '@/core/api/product-category.api';
import { userSaleApi } from '@/core/api/user-sale.api';
import { FieldType } from '@/core/components/field/FieldDisplay';
import { NKFormType } from '@/core/components/form/NKForm';
import TableBuilder from '@/core/components/table/TableBuilder';
import { FilterComparator } from '@/core/models/common';
import { mapListToOptions } from '@/core/utils/api.helper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const router = useRouter();

    return (
        <>
            <TableBuilder
                sourceKey="userSale"
                title="User Sale"
                queryApi={userSaleApi.v1Get}
                actionColumns={[
                    {
                        label: 'View Detail',
                        onClick: (record) => {
                            const id = _get(record, 'id');
                            if (id) {
                                router.push(NKRouter.userSale.detail(id));
                            }
                        },
                    },
                    {
                        label: 'Edit',
                        onClick: (record) => {
                            const id = _get(record, 'id');
                            if (id) {
                                router.push(NKRouter.userSale.edit(id));
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
                        key: 'name',
                        title: 'Name',
                        type: FieldType.TEXT,
                    },
                    {
                        key: 'imageUrls',
                        title: 'Image',
                        type: FieldType.THUMBNAIL,
                    },
                    {
                        key: 'price',
                        title: 'Price',
                        type: FieldType.NUMBER,
                    },
                    {
                        key: 'productCategory.id',
                        title: 'Product Category',
                        type: FieldType.BADGE_API,
                        apiAction: async () => mapListToOptions(await productCategoryApi.v1Select('', true)),
                    },
                    {
                        key: 'status',
                        title: 'Status',
                        type: FieldType.BADGE_API,
                        apiAction: userSaleApi.v1GetEnumStatus,
                    },
                    {
                        key: 'createdAt',
                        title: 'Created At',
                        type: FieldType.TIME_FULL,
                    },
                    {
                        key: 'updatedAt',
                        title: 'Updated At',
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
                        name: 'productCategory.id',
                        label: 'Category',
                        type: NKFormType.SELECT_API_OPTION,
                        comparator: FilterComparator.EQUAL,
                        defaultValue: '',
                        apiAction: productCategoryApi.v1Select,
                    },
                    {
                        name: 'status',
                        label: 'Status',
                        type: NKFormType.SELECT_API_OPTION,
                        comparator: FilterComparator.EQUAL,
                        defaultValue: '',
                        apiAction: userSaleApi.v1GetEnumStatus,
                    },
                ]}
            />
        </>
    );
};

export default Page;
