'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Table, Tabs } from 'antd';
import joi from 'joi';
import _get from 'lodash/get';

import { NKRouter } from '@/core/NKRouter';
import { FeedbackQuestionIV1CreateDto, FeedbackQuestionIV1UpdateDto, feedbackQuestionApi } from '@/core/api/feedback-question.api';
import { feedbackApi } from '@/core/api/feedback.api';
import { musicAuthorApi } from '@/core/api/music-author.api';
import CTAButton from '@/core/components/cta/CTABtn';
import FieldBoolean from '@/core/components/field/FieldBoolean';
import FieldBuilder from '@/core/components/field/FieldBuilder';
import { FieldType } from '@/core/components/field/FieldDisplay';
import FieldMultipleText from '@/core/components/field/FieldMultipleText';
import FieldNumber from '@/core/components/field/FieldNumber';
import FieldText from '@/core/components/field/FieldText';
import FieldTime from '@/core/components/field/FieldTime';
import FieldUuid from '@/core/components/field/FieldUuid';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';
import ModalBuilder from '@/core/components/modal/ModalBuilder';
import { Feedback } from '@/core/models/feedback';
import { MusicAuthor } from '@/core/models/musicAuthor';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const id = _get(params, 'id') as string;

    const feedback = useQuery(
        ['feedback', id],
        () => {
            return feedbackApi.v1GetById(id);
        },
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    );
    if (feedback.isFetching) {
        return <div>Loading...</div>;
    }

    return (
        <div className="">
            <FieldBuilder<Feedback>
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
                        label: 'Code',
                        key: 'code',
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
                        label: 'Description',
                        key: 'description',
                        type: FieldType.MULTILINE_TEXT,
                        span: 3,
                    },
                ]}
                record={feedback.data}
                extra={
                    <div className="flex items-center gap-4">
                        <CTAButton
                            ctaApi={() => {
                                return feedbackApi.v1Delete(id);
                            }}
                            isConfirm
                        >
                            <Button danger>Delete</Button>
                        </CTAButton>
                        <ModalBuilder btnLabel="Add Question" modalTitle={`Add Question`} btnProps={{}}>
                            <FormBuilder<FeedbackQuestionIV1CreateDto>
                                apiAction={(dto) => {
                                    return feedbackQuestionApi.v1Create(dto);
                                }}
                                onExtraSuccessAction={() => {
                                    feedback.refetch();
                                }}
                                fields={[
                                    {
                                        label: 'Question',
                                        name: 'question',
                                        type: NKFormType.TEXTAREA,
                                        span: 3,
                                    },
                                    {
                                        label: 'Index',
                                        name: 'index',
                                        type: NKFormType.NUMBER,
                                        span: 3,
                                    },
                                ]}
                                schema={{
                                    answers: joi.array(),
                                    feedbackId: joi.string().required(),
                                    index: joi.number().min(0).required(),
                                    question: joi.string().required(),
                                }}
                                title=""
                                defaultValues={{
                                    answers: [],
                                    feedbackId: id,
                                    index: 1,
                                    question: '',
                                }}
                            />
                        </ModalBuilder>
                        <Link href={NKRouter.feedback.edit(id)}>
                            <Button>Edit</Button>
                        </Link>
                    </div>
                }
                title="Test"
            />
            <div>
                <Tabs
                    defaultActiveKey="1"
                    items={[
                        {
                            label: 'Question',
                            key: '1',
                            children: (
                                <>
                                    <Table
                                        dataSource={feedback.data?.feedbackQuestions?.sort((a, b) => {
                                            return Number(b.index) - Number(a.index);
                                        })}
                                        className="fade-in"
                                        rowKey="id"
                                        expandable={{
                                            expandedRowRender: (record) => (
                                                <div style={{ margin: 0 }} className="flex flex-col gap-4">
                                                    {record.answers
                                                        .sort((a, b) => {
                                                            return Number(b.index) - Number(a.index);
                                                        })
                                                        .map((answer) => {
                                                            return (
                                                                <div key={answer.answer} className="flex duration-300 hover:bg-blue-200">
                                                                    <div className="w-full flex-1">
                                                                        <div>
                                                                            {answer.index} - Point: {answer.point}
                                                                        </div>
                                                                        <div>{answer.answer}</div>
                                                                    </div>
                                                                    <div className="flex gap-2">
                                                                        <CTAButton
                                                                            extraOnSuccess={() => {
                                                                                feedback.refetch();
                                                                            }}
                                                                            ctaApi={() => {
                                                                                const index = record.answers.findIndex((item) => {
                                                                                    return item.answer === answer.answer;
                                                                                });
                                                                                return feedbackQuestionApi.v1Update(record.id, {
                                                                                    index: record.index,
                                                                                    question: record.question,
                                                                                    answers: record.answers.filter((item, i) => {
                                                                                        return i !== index;
                                                                                    }),
                                                                                });
                                                                            }}
                                                                            isConfirm
                                                                        >
                                                                            <Button
                                                                                size="small"
                                                                                type="primary"
                                                                                danger
                                                                                icon={<DeleteOutlined rev="" />}
                                                                            ></Button>
                                                                        </CTAButton>
                                                                        <ModalBuilder
                                                                            btnLabel=""
                                                                            modalTitle={`Edit answer`}
                                                                            btnProps={{
                                                                                size: 'small',
                                                                                icon: <EditOutlined rev="" />,
                                                                            }}
                                                                        >
                                                                            <FormBuilder
                                                                                apiAction={(dto) => {
                                                                                    const index = record.answers.findIndex((item) => {
                                                                                        return item.answer === answer.answer;
                                                                                    });

                                                                                    const newAnswers = record.answers;
                                                                                    newAnswers[index] = {
                                                                                        ...newAnswers[index],
                                                                                        ...dto,
                                                                                    };
                                                                                    return feedbackQuestionApi.v1Update(record.id, {
                                                                                        index: record.index,
                                                                                        question: record.question,
                                                                                        answers: newAnswers,
                                                                                    });
                                                                                }}
                                                                                onExtraSuccessAction={() => {
                                                                                    feedback.refetch();
                                                                                }}
                                                                                fields={[
                                                                                    {
                                                                                        label: 'Answer',
                                                                                        name: 'answer',
                                                                                        type: NKFormType.TEXTAREA,
                                                                                        span: 3,
                                                                                    },
                                                                                    {
                                                                                        label: 'Point',
                                                                                        name: 'point',
                                                                                        type: NKFormType.NUMBER,
                                                                                        span: 3,
                                                                                    },
                                                                                    {
                                                                                        label: 'Index',
                                                                                        name: 'index',
                                                                                        type: NKFormType.NUMBER,

                                                                                        span: 3,
                                                                                    },
                                                                                ]}
                                                                                schema={{
                                                                                    point: joi.number().min(0).required(),
                                                                                    answer: joi.string().required(),
                                                                                    index: joi.number().min(0).required(),
                                                                                }}
                                                                                title=""
                                                                                defaultValues={{
                                                                                    answer: answer.answer,
                                                                                    point: answer.point,
                                                                                    index: answer.index,
                                                                                }}
                                                                            />
                                                                        </ModalBuilder>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                </div>
                                            ),
                                            rowExpandable: (record) => record.answers.length !== 0,
                                        }}
                                        columns={[
                                            {
                                                key: 'index',
                                                title: 'Index',
                                                render: (record) => {
                                                    const value = _get(record, 'index');
                                                    return <FieldText value={value} />;
                                                },
                                            },
                                            {
                                                key: 'question',
                                                title: 'Question',
                                                render: (record) => {
                                                    const value = _get(record, 'question');
                                                    return <FieldNumber value={value} />;
                                                },
                                            },
                                            {
                                                key: 'isDeleted',
                                                title: 'Is Deleted',
                                                render: (record) => {
                                                    const value = _get(record, 'isDeleted');
                                                    return <FieldBoolean value={value} />;
                                                },
                                            },
                                            {
                                                width: 200,
                                                key: 'numberOfAnswer',
                                                title: 'Number of answer',
                                                render: (record) => {
                                                    const value = _get(record, 'answers.length');
                                                    return <FieldNumber value={value} />;
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
                                                                modalTitle={`Create answer`}
                                                                btnProps={{
                                                                    size: 'small',
                                                                    type: 'primary',
                                                                    icon: <PlusOutlined rev="" />,
                                                                }}
                                                            >
                                                                <FormBuilder
                                                                    apiAction={(dto) => {
                                                                        return feedbackQuestionApi.v1Update(record.id, {
                                                                            index: record.index,
                                                                            question: record.question,
                                                                            answers: [...record.answers, dto],
                                                                        });
                                                                    }}
                                                                    onExtraSuccessAction={() => {
                                                                        feedback.refetch();
                                                                    }}
                                                                    fields={[
                                                                        {
                                                                            label: 'Answer',
                                                                            name: 'answer',
                                                                            type: NKFormType.TEXTAREA,
                                                                            span: 3,
                                                                        },
                                                                        {
                                                                            label: 'Point',
                                                                            name: 'point',
                                                                            type: NKFormType.NUMBER,
                                                                            span: 3,
                                                                        },
                                                                        {
                                                                            label: 'Index',
                                                                            name: 'index',
                                                                            type: NKFormType.NUMBER,

                                                                            span: 3,
                                                                        },
                                                                    ]}
                                                                    schema={{
                                                                        point: joi.number().min(0).required(),
                                                                        answer: joi.string().required(),
                                                                        index: joi.number().min(0).required(),
                                                                    }}
                                                                    title=""
                                                                    defaultValues={{
                                                                        answer: '',
                                                                        point: 1,
                                                                        index: 1,
                                                                    }}
                                                                />
                                                            </ModalBuilder>
                                                            <CTAButton
                                                                extraOnSuccess={() => {
                                                                    feedback.refetch();
                                                                }}
                                                                ctaApi={() => {
                                                                    return feedbackQuestionApi.v1Delete(record.id);
                                                                }}
                                                                isConfirm
                                                            >
                                                                <Button size="small" type="primary" danger icon={<DeleteOutlined rev="" />}></Button>
                                                            </CTAButton>
                                                            <ModalBuilder
                                                                btnLabel=""
                                                                modalTitle={`Edit Answer`}
                                                                btnProps={{
                                                                    size: 'small',
                                                                    icon: <EditOutlined rev="" />,
                                                                }}
                                                            >
                                                                <FormBuilder<FeedbackQuestionIV1UpdateDto>
                                                                    apiAction={(dto) => {
                                                                        return feedbackQuestionApi.v1Update(record.id, dto);
                                                                    }}
                                                                    onExtraSuccessAction={() => {
                                                                        feedback.refetch();
                                                                    }}
                                                                    fields={[
                                                                        {
                                                                            label: 'Question',
                                                                            name: 'question',
                                                                            type: NKFormType.TEXTAREA,
                                                                            span: 3,
                                                                        },
                                                                        {
                                                                            label: 'Index',
                                                                            name: 'index',
                                                                            type: NKFormType.NUMBER,

                                                                            span: 3,
                                                                        },
                                                                    ]}
                                                                    schema={{
                                                                        question: joi.string().required(),
                                                                        index: joi.number().min(0).required(),
                                                                        answers: joi.array().items(
                                                                            joi.object({
                                                                                answer: joi.string().required(),
                                                                                point: joi.number().min(0).required(),
                                                                                index: joi.number().min(0).required(),
                                                                            }),
                                                                        ),
                                                                    }}
                                                                    title=""
                                                                    defaultValues={{
                                                                        question: record.question,
                                                                        index: record.index,
                                                                        answers: record.answers,
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
                                </>
                            ),
                        },
                        {
                            label: 'User Test',
                            key: '2',
                            children: (
                                <>
                                    <Table
                                        dataSource={feedback.data?.userFeedbacks.sort((a, b) => {
                                            return new Date(b.takeDate).getTime() - new Date(a.takeDate).getTime();
                                        })}
                                        className="fade-in"
                                        rowKey="id"
                                        columns={[
                                            {
                                                key: 'id',
                                                title: 'Id',
                                                render: (record) => {
                                                    const value = _get(record, 'id');
                                                    return <FieldUuid value={value} />;
                                                },
                                            },
                                            {
                                                key: 'user.name',
                                                title: 'user.name',
                                                render: (record) => {
                                                    const value = _get(record, 'user.name');
                                                    return <FieldText value={value} />;
                                                },
                                            },
                                            {
                                                key: 'takeDate',
                                                title: 'Take Date',
                                                render: (record) => {
                                                    const value = _get(record, 'takeDate');
                                                    return <FieldTime value={value} format="DD/MM/YYYY HH:mm:ss" />;
                                                },
                                            },
                                            {
                                                width: 200,
                                                key: 'points',
                                                title: 'Points',
                                                render: (record) => {
                                                    const value = _get(record, 'point');
                                                    return <FieldNumber value={value} />;
                                                },
                                            },
                                        ]}
                                        pagination={false}
                                    />
                                </>
                            ),
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export default Page;
