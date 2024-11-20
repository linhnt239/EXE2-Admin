'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { EditOutlined, ImportOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Table, Tabs } from 'antd';
import joi from 'joi';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { productReviewApi } from '@/core/api/product-review.api';
import { productVariantApi } from '@/core/api/product-variant.api';
import { productApi } from '@/core/api/product.api';
import CTAButton from '@/core/components/cta/CTABtn';
import FieldBoolean from '@/core/components/field/FieldBoolean';
import FieldBuilder from '@/core/components/field/FieldBuilder';
import { FieldType } from '@/core/components/field/FieldDisplay';
import FiledMultipleImage from '@/core/components/field/FieldMultipleImages';
import FieldMultipleText from '@/core/components/field/FieldMultipleText';
import FieldNumber from '@/core/components/field/FieldNumber';
import FieldText from '@/core/components/field/FieldText';
import FieldThumbnail from '@/core/components/field/FieldThumbnail';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';
import ModalBuilder from '@/core/components/modal/ModalBuilder';
import { Product } from '@/core/models/product';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const id = _get(params, 'id') as string;
    const [tabKey, setTabKey] = React.useState('1');

    const product = useQuery(
        ['product', id],
        () => {
            return productApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );
    if (product.isFetching) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full">
            <FieldBuilder<Product>
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
                ]}
                record={product.data}
                extra={
                    <div className="flex items-center gap-4">
                        <CTAButton
                            ctaApi={() => {
                                return productApi.v1Delete(id);
                            }}
                            isConfirm
                        >
                            <Button danger>Delete</Button>
                        </CTAButton>
                        <Link href={NKRouter.product.edit(id)}>
                            <Button>Edit</Button>
                        </Link>
                        <ModalBuilder btnLabel="Add Variant" modalTitle="Add Variant">
                            <FormBuilder
                                apiAction={productVariantApi.v1Create}
                                onExtraSuccessAction={() => {
                                    product.refetch();
                                }}
                                fields={[
                                    {
                                        label: 'Name',
                                        name: 'name',
                                        type: NKFormType.TEXT,
                                        span: 3,
                                    },
                                    {
                                        label: 'Description',
                                        name: 'description',
                                        type: NKFormType.TEXTAREA,
                                        span: 3,
                                    },

                                    {
                                        label: 'Quantity',
                                        name: 'quantity',
                                        type: NKFormType.NUMBER,
                                        span: 3,
                                    },
                                    {
                                        label: 'Price (VNĐ)',
                                        name: 'price',
                                        type: NKFormType.NUMBER,

                                        span: 3,
                                    },
                                    {
                                        label: 'Allow Buy Exceed Quantity',
                                        name: 'isAllowBuyExceedQuantity',
                                        type: NKFormType.BOOLEAN,
                                        span: 3,
                                    },
                                    {
                                        label: 'Images',
                                        name: 'imageUrls',
                                        type: NKFormType.MULTI_UPLOAD_IMAGE,
                                        span: 3,
                                    },
                                ]}
                                schema={{
                                    name: joi.string().required(),
                                    description: joi.string().required(),
                                    imageUrls: joi.array().items(joi.string()).min(1).required(),
                                    price: joi.number().min(0).required(),
                                    productId: joi.string().required(),
                                    quantity: joi.number().min(0).required(),
                                    isAllowBuyExceedQuantity: joi.boolean().required(),
                                }}
                                title=""
                                defaultValues={{
                                    description: '',
                                    imageUrls: [],
                                    name: '',
                                    price: 0,
                                    productId: id,
                                    quantity: 0,
                                    isAllowBuyExceedQuantity: false,
                                }}
                            />
                        </ModalBuilder>
                    </div>
                }
                title="Product"
            />
            <div>
                <Tabs
                    defaultActiveKey={tabKey}
                    items={[
                        {
                            key: '1',
                            label: 'Product Variants',
                            children: (
                                <Table
                                    dataSource={product.data?.productVariants.sort((a, b) => {
                                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                                    })}
                                    className="fade-in"
                                    columns={[
                                        {
                                            key: 'name',
                                            title: 'Name',
                                            render: (record) => {
                                                const value = _get(record, 'name');
                                                return <FieldText value={value} />;
                                            },
                                        },
                                        {
                                            key: 'price',
                                            title: 'Price (VNĐ)',
                                            render: (record) => {
                                                const value = _get(record, 'price');
                                                return <FieldNumber value={value} />;
                                            },
                                        },
                                        {
                                            title: 'Allow Buy Exceed Quantity',
                                            key: 'isAllowBuyExceedQuantity',
                                            render: (record) => {
                                                const value = _get(record, 'isAllowBuyExceedQuantity');
                                                return <FieldBoolean value={value} />;
                                            },
                                        },
                                        {
                                            key: 'quantity',
                                            title: 'Quantity',
                                            render: (record) => {
                                                const value = _get(record, 'quantity');
                                                return <FieldNumber value={value} />;
                                            },
                                        },
                                        {
                                            key: 'description',
                                            title: 'Description',
                                            width: 300,
                                            render: (record) => {
                                                const value = _get(record, 'description');

                                                return <FieldMultipleText value={value} />;
                                            },
                                        },
                                        {
                                            key: 'images',
                                            title: 'Images',
                                            width: 300,
                                            render: (record) => {
                                                const value = _get(record, 'imageUrls', []);
                                                return <FiledMultipleImage value={value} />;
                                            },
                                        },
                                        {
                                            key: 'id',
                                            title: '',
                                            width: 50,
                                            render: (record) => {
                                                return (
                                                    <div className="flex gap-2">
                                                        <ModalBuilder
                                                            btnLabel=""
                                                            modalTitle={`Edit ${record.name}`}
                                                            btnProps={{
                                                                size: 'small',
                                                                icon: <EditOutlined rev="" />,
                                                            }}
                                                        >
                                                            <FormBuilder
                                                                apiAction={(dto) => {
                                                                    return productVariantApi.v1Update(record.id, dto);
                                                                }}
                                                                onExtraSuccessAction={() => {
                                                                    product.refetch();
                                                                }}
                                                                fields={[
                                                                    {
                                                                        label: 'Name',
                                                                        name: 'name',
                                                                        type: NKFormType.TEXT,
                                                                        span: 3,
                                                                    },
                                                                    {
                                                                        label: 'Description',
                                                                        name: 'description',
                                                                        type: NKFormType.TEXTAREA,
                                                                        span: 3,
                                                                    },

                                                                    {
                                                                        label: 'Price (VNĐ)',
                                                                        name: 'price',
                                                                        type: NKFormType.NUMBER,

                                                                        span: 3,
                                                                    },
                                                                    {
                                                                        label: 'Allow Buy Exceed Quantity',
                                                                        name: 'isAllowBuyExceedQuantity',
                                                                        type: NKFormType.BOOLEAN,
                                                                        span: 3,
                                                                    },
                                                                    {
                                                                        label: 'Images',
                                                                        name: 'imageUrls',
                                                                        type: NKFormType.MULTI_UPLOAD_IMAGE,
                                                                        span: 3,
                                                                    },
                                                                ]}
                                                                schema={{
                                                                    name: joi.string().required(),
                                                                    description: joi.string().required(),
                                                                    imageUrls: joi.array().items(joi.string()).min(1).required(),
                                                                    price: joi.number().min(0).required(),
                                                                    isAllowBuyExceedQuantity: joi.boolean().required(),
                                                                }}
                                                                title=""
                                                                defaultValues={{
                                                                    description: record.description,
                                                                    imageUrls: record.imageUrls,
                                                                    name: record.name,
                                                                    price: record.price,
                                                                    isAllowBuyExceedQuantity: record.isAllowBuyExceedQuantity,
                                                                }}
                                                            />
                                                        </ModalBuilder>
                                                        <ModalBuilder
                                                            btnLabel=""
                                                            modalTitle={`Import Quantity ${record.name}`}
                                                            btnProps={{
                                                                size: 'small',
                                                                icon: <ImportOutlined rev="" />,
                                                            }}
                                                        >
                                                            <FormBuilder
                                                                apiAction={(dto) => {
                                                                    return productVariantApi.v1Import(record.id, dto);
                                                                }}
                                                                onExtraSuccessAction={() => {
                                                                    product.refetch();
                                                                }}
                                                                fields={[
                                                                    {
                                                                        label: 'Quantity',
                                                                        name: 'quantity',
                                                                        type: NKFormType.NUMBER,

                                                                        span: 3,
                                                                    },
                                                                ]}
                                                                schema={{
                                                                    quantity: joi.number().min(0).required(),
                                                                }}
                                                                title=""
                                                                defaultValues={{
                                                                    quantity: 0,
                                                                }}
                                                            />
                                                        </ModalBuilder>
                                                    </div>
                                                );
                                            },
                                        },
                                    ]}
                                    pagination={false}
                                />
                            ),
                        },
                        {
                            key: '2',
                            label: 'Product Reviews',
                            children: (
                                <div>
                                    <Table
                                        dataSource={product.data?.productReviews.sort((a, b) => {
                                            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                                        })}
                                        className="fade-in"
                                        columns={[
                                            {
                                                key: 'name',
                                                title: 'Name',
                                                render: (record) => {
                                                    const value = _get(record, 'name');
                                                    return <FieldText value={value} />;
                                                },
                                            },
                                            {
                                                key: 'email',
                                                title: 'Email',
                                                render: (record) => {
                                                    const value = _get(record, 'email');
                                                    return <FieldText value={value} />;
                                                },
                                            },
                                            {
                                                title: 'Rate',
                                                key: 'rate',
                                                render: (record) => {
                                                    const value = _get(record, 'rate', 0);
                                                    return <FieldNumber value={value} />;
                                                },
                                            },

                                            {
                                                key: 'content',
                                                title: 'Content',
                                                width: 300,
                                                render: (record) => {
                                                    const value = _get(record, 'content');

                                                    return <FieldMultipleText value={value} />;
                                                },
                                            },
                                            {
                                                key: 'images',
                                                title: 'Images',
                                                width: 300,
                                                render: (record) => {
                                                    const value = _get(record, 'imageUrls', []);
                                                    return <FieldThumbnail value={value} />;
                                                },
                                            },
                                            {
                                                key: 'isApproved',
                                                title: 'Is Approved',
                                                render: (record) => {
                                                    const value = _get(record, 'isApproved', false);
                                                    return <FieldBoolean value={value} />;
                                                },
                                            },
                                            {
                                                key: 'isApproved',
                                                title: 'Is Approved',
                                                render: (record) => {
                                                    const value = _get(record, 'isApproved', false);
                                                    return (
                                                        <div>
                                                            <CTAButton
                                                                ctaApi={() => {
                                                                    return productReviewApi.v1PutApprove(record.id, {
                                                                        isApproved: !value,
                                                                    });
                                                                }}
                                                                extraOnSuccess={() => {
                                                                    product.refetch();
                                                                }}
                                                                isConfirm
                                                                confirmMessage={
                                                                    value
                                                                        ? 'Are you sure to disapprove this review?'
                                                                        : 'Are you sure to approve this review?'
                                                                }
                                                            >
                                                                <Button
                                                                    size="small"
                                                                    type="primary"
                                                                    icon={<EditOutlined rev="" />}
                                                                    danger={value}
                                                                ></Button>
                                                            </CTAButton>
                                                        </div>
                                                    );
                                                },
                                            },
                                        ]}
                                        pagination={false}
                                    />
                                </div>
                            ),
                        },
                    ]}
                    onChange={(key) => {
                        setTabKey(key);
                    }}
                />
            </div>
        </div>
    );
};

export default Page;
