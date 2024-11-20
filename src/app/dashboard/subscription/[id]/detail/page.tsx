'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { subscriptionApi } from '@/core/api/subscription.api';
import CTAButton from '@/core/components/cta/CTABtn';
import FieldBuilder from '@/core/components/field/FieldBuilder';
import { FieldType } from '@/core/components/field/FieldDisplay';
import { Subscription } from '@/core/models/subscription';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const id = _get(params, 'id') as string;

    const subscription = useQuery(
        ['subscription', id],
        () => {
            return subscriptionApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );
    if (subscription.isFetching) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-3xl">
            <FieldBuilder<Subscription>
                fields={[
                    {
                        label: 'Name',
                        key: 'name',
                        type: FieldType.TEXT,
                        span: 3,
                    },
                    {
                        label: 'Create At',
                        key: 'createdAt',
                        type: FieldType.TIME_FULL,
                        span: 3,
                    },
                    {
                        label: 'Update At',
                        key: 'updatedAt',
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
                        label: 'Image Urls',
                        key: 'imageUrls',
                        type: FieldType.MULTIPLE_IMAGES,
                        span: 3,
                    },
                    {
                        label: 'Duration (Days)',
                        key: 'duration',
                        type: FieldType.NUMBER,
                        span: 3,
                    },
                    {
                        label: 'Index',
                        key: 'index',
                        type: FieldType.NUMBER,
                        span: 3,
                    },
                    {
                        label: 'Price (VNĐ)',
                        key: 'price',
                        type: FieldType.NUMBER,
                        span: 3,
                    },
                ]}
                record={subscription.data}
                extra={
                    <div className="flex items-center gap-4">
                        <CTAButton
                            ctaApi={() => {
                                return subscriptionApi.v1Delete(id);
                            }}
                            isConfirm
                        >
                            <Button danger>Delete</Button>
                        </CTAButton>
                        <Link href={NKRouter.subscription.edit(id)}>
                            <Button>Edit</Button>
                        </Link>
                    </div>
                }
                title="Subscription"
            />
        </div>
    );
};

export default Page;
