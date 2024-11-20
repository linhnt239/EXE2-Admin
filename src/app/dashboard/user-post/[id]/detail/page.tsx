'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { feedbackApi } from '@/core/api/feedback.api';
import { userPostApi } from '@/core/api/user-post.api';
import CTAButton from '@/core/components/cta/CTABtn';
import FieldBuilder from '@/core/components/field/FieldBuilder';
import { FieldType } from '@/core/components/field/FieldDisplay';
import { UserPost } from '@/core/models/userPost';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const id = _get(params, 'id') as string;

    const userPost = useQuery(
        ['userPost', id],
        () => {
            return userPostApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );
    if (userPost.isFetching) {
        return <div>Loading...</div>;
    }

    return (
        <div className="">
            <FieldBuilder<UserPost>
                fields={[
                    {
                        label: 'Title',
                        key: 'title',
                        type: FieldType.TEXT,
                        span: 3,
                    },
                    {
                        label: 'User Name',
                        key: 'user.name',
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
                        label: 'Tag',
                        key: 'tag',
                        type: FieldType.TEXT,
                        span: 1,
                    },
                    {
                        label: 'Is Active',
                        key: 'isActive',
                        type: FieldType.BOOLEAN,
                        span: 1,
                    },
                    {
                        label: 'Is Deleted',
                        key: 'isDeleted',
                        type: FieldType.BOOLEAN,
                        span: 1,
                    },
                    {
                        label: 'Content',
                        key: 'content',
                        type: FieldType.RICH_TEXT,
                        span: 3,
                    },
                    {
                        label: 'Number of comments',
                        key: 'userPostComments',
                        type: FieldType.LENGTH,
                        span: 3,
                    },
                ]}
                record={userPost.data}
                title="Forum Detail"
                extra={
                    <>
                        <CTAButton
                            ctaApi={() => {
                                return userPostApi.v1Delete(id);
                            }}
                            isConfirm
                            extraOnSuccess={() => {
                                userPost.refetch();
                            }}
                        >
                            <Button type="primary" className="" danger>
                                Delete
                            </Button>
                        </CTAButton>
                    </>
                }
            />
            <div></div>
        </div>
    );
};

export default Page;
