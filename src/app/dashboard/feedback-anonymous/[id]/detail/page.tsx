'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { feedbackAnonymousApi } from '@/core/api/feedback-anonymous.api';
import FieldBuilder from '@/core/components/field/FieldBuilder';
import { FieldType } from '@/core/components/field/FieldDisplay';
import { FeedbackAnonymous } from '@/core/models/feedbackAnonymous';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const id = _get(params, 'id') as string;

    const feedbackAnonymous = useQuery(
        ['feedbackAnonymous', id],
        () => {
            return feedbackAnonymousApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );
    if (feedbackAnonymous.isFetching) {
        return <div>Loading...</div>;
    }

    return (
        <div className="">
            <FieldBuilder<FeedbackAnonymous>
                fields={[
                    {
                        label: 'Name',
                        key: 'name',
                        type: FieldType.TEXT,
                        span: 1,
                    },
                    {
                        label: 'Status',
                        key: 'status',
                        type: FieldType.BADGE_API,
                        span: 1,
                        apiAction: feedbackAnonymousApi.v1GetEnumStatus,
                    },
                    {
                        label: 'Is Deleted',
                        key: 'isDeleted',
                        type: FieldType.BOOLEAN,
                        span: 1,
                    },
                    {
                        label: 'Name',
                        key: 'name',
                        type: FieldType.TEXT,
                        span: 1,
                    },
                    {
                        label: 'Email',
                        key: 'email',
                        type: FieldType.TEXT,
                        span: 1,
                    },
                    {
                        label: 'Phone',
                        key: 'phone',
                        type: FieldType.TEXT,
                        span: 1,
                    },

                    {
                        label: 'Subject',
                        key: 'subject',
                        type: FieldType.TEXT,
                        span: 3,
                    },
                    {
                        label: 'Description',
                        key: 'description',
                        type: FieldType.MULTILINE_TEXT,
                        span: 3,
                    },
                    {
                        label: 'Image',
                        key: 'imageUrls',
                        type: FieldType.MULTIPLE_IMAGES,
                        span: 3,
                    },
                    {
                        label: 'Note',
                        key: 'note',
                        type: FieldType.MULTILINE_TEXT,
                        span: 3,
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
                        span: 2,
                    },
                ]}
                record={feedbackAnonymous.data}
                extra={
                    <div className="flex items-center gap-4">
                        <Link href={NKRouter.feedbackAnonymous.edit(id)}>
                            <Button>Edit</Button>
                        </Link>
                    </div>
                }
                title="Contact Detail"
            />
        </div>
    );
};

export default Page;
