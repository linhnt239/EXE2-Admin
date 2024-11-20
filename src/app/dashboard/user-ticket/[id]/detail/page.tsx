'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Image, Send } from 'akar-icons';
import { Button } from 'antd';
import clsx from 'clsx';
import joi from 'joi';
import _get from 'lodash/get';
import moment from 'moment';
import { FormProvider, useForm } from 'react-hook-form';
import { PhotoProvider, PhotoView } from 'react-photo-view';

import { NKRouter } from '@/core/NKRouter';
import { orderDiscountApi } from '@/core/api/order-discount.api';
import { SendUserTicketIV1Post, userTicketApi } from '@/core/api/user-ticket.api';
import CTAButton from '@/core/components/cta/CTABtn';
import FieldBuilder from '@/core/components/field/FieldBuilder';
import { FieldType } from '@/core/components/field/FieldDisplay';
import FormBuilder from '@/core/components/form/FormBuilder';
import { NKFormType } from '@/core/components/form/NKForm';
import NKRichText from '@/core/components/form/NKRichText';
import NKTextField from '@/core/components/form/NKTextField';
import NKTextareaField from '@/core/components/form/NKTextareaField';
import ModalBuilder from '@/core/components/modal/ModalBuilder';
import { OrderDiscount } from '@/core/models/orderDiscount';
import { UserTicket } from '@/core/models/userTicket';

interface PageProps {}

const defaultValues: SendUserTicketIV1Post = {
    content: '',
    type: 'TEXT',
};

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const id = _get(params, 'id') as string;
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const [lastMessageId, setLastMessageId] = React.useState<string>('');
    const [lastMessageScrollId, setLastMessageScrollId] = React.useState<string>('');

    const formMethods = useForm<SendUserTicketIV1Post>({
        defaultValues,
        resolver: joiResolver(
            joi.object({
                content: joi.string().required(),
            }),
        ),
    });

    React.useEffect(() => {
        if (lastMessageId !== lastMessageScrollId) {
            setLastMessageScrollId(lastMessageId);
            setTimeout(() => {
                wrapperRef.current?.scrollTo({
                    top: wrapperRef.current?.scrollHeight,
                    behavior: 'smooth',
                });
            }, 1000);
        }
    }, [lastMessageId]);

    const userTicket = useQuery(
        ['user-ticket', id],
        () => {
            return userTicketApi.v1GetById(id);
        },
        {
            refetchInterval: 3000,
            onSuccess(data) {
                const lastMessage = data.userTicketMessages[data.userTicketMessages.length - 1];
                if (lastMessage.id !== lastMessageId) {
                    setLastMessageId(lastMessage.id);
                }
            },
        },
    );

    const sendResponseMutation = useMutation(
        (message: string) => {
            return userTicketApi.v1PostSendById(id, {
                content: message,
                type: 'TEXT',
            });
        },
        {
            onSuccess: () => {
                userTicket.refetch();
                formMethods.reset(defaultValues);

                setTimeout(() => {
                    wrapperRef.current?.scrollTo({
                        top: wrapperRef.current?.scrollHeight,
                        behavior: 'smooth',
                    });
                }, 1000);
            },
        },
    );

    return (
        <div className="">
            <FieldBuilder<UserTicket>
                fields={[
                    {
                        label: 'Name',
                        key: 'name',
                        type: FieldType.TEXT,
                        span: 1,
                    },
                    {
                        label: 'Customer Name',
                        key: 'user.name',
                        type: FieldType.TEXT,
                        span: 1,
                    },
                    {
                        label: 'Is Need Read',
                        key: 'isNeedRead',
                        type: FieldType.BOOLEAN,
                        span: 1,
                    },
                    {
                        label: 'Customer Email',
                        key: 'user.email',
                        type: FieldType.TEXT,
                        span: 3,
                    },
                ]}
                record={userTicket.data}
                extra={
                    <div className="flex items-center gap-4">
                        {/* <CTAButton
                            ctaApi={() => {
                                return orderDiscountApi.v1Delete(id);
                            }}
                            isConfirm
                        >
                            <Button danger>Delete</Button>
                        </CTAButton> */}
                    </div>
                }
                title="Customer Support Detail"
            />
            <div className="flex w-full flex-col">
                <div className="mt-4 flex max-h-[600px] min-h-[500px] flex-col overflow-y-auto " ref={wrapperRef}>
                    <div className="flex-1 bg-gray-200 p-4 ">
                        <div className="flex flex-col gap-2">
                            {userTicket.data?.userTicketMessages.map((message, idx) => {
                                return (
                                    <div key={message.id} className="flex flex-col">
                                        {moment(message.createdAt)
                                            .subtract(10, 'minutes')
                                            .isAfter(userTicket.data?.userTicketMessages[idx - 1]?.createdAt) && (
                                            <p className="my-3 text-center text-xs text-gray-700">
                                                {moment(message.createdAt).format('HH:mm - DD/MM')}
                                            </p>
                                        )}
                                        <div
                                            className={clsx('flex', {
                                                'justify-end ': message.isResponse,
                                            })}
                                        >
                                            <div
                                                className={clsx('flex items-end gap-2', {
                                                    'flex-row-reverse': message.isResponse,
                                                })}
                                            >
                                                <div className="h-6 w-6 shrink-0 overflow-hidden rounded-full">
                                                    {userTicket.data.userTicketMessages[idx + 1]?.isResponse !== message.isResponse && (
                                                        <img
                                                            className="h-full w-full object-cover "
                                                            src={message.isResponse ? '/assets/images/logo.png' : userTicket.data.user.avatar}
                                                            alt=""
                                                        />
                                                    )}
                                                </div>
                                                <div
                                                    className={clsx('inline-block max-w-[640px] rounded-md px-4 py-2', {
                                                        'bg-blue-800 text-white': message.isResponse && message.type === 'TEXT',
                                                        'bg-gray-300 text-black': !message.isResponse && message.type === 'TEXT',
                                                    })}
                                                >
                                                    {message.type === 'TEXT' && <>{message.content}</>}
                                                    {message.type === 'IMAGE' && (
                                                        <>
                                                            <PhotoProvider speed={() => 200} maskOpacity={0.7}>
                                                                <PhotoView src={message.content}>
                                                                    <img src={message.content} alt="" className="h-full w-full" />
                                                                </PhotoView>
                                                            </PhotoProvider>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex w-full">
                    <FormProvider {...formMethods}>
                        <form
                            className="flex flex-1"
                            onSubmit={formMethods.handleSubmit((data) => {
                                sendResponseMutation.mutate(data.content);
                            })}
                        >
                            <NKTextField isShow={false} label="Content" name="content" defaultValue="" />
                            <Button
                                htmlType="submit"
                                className="flex items-center justify-center "
                                icon={
                                    <div className="">
                                        <Send strokeWidth={2} size={16} />
                                    </div>
                                }
                            >
                                Send
                            </Button>
                        </form>
                    </FormProvider>
                    <ModalBuilder
                        btnLabel="Image"
                        btnProps={{
                            icon: (
                                <div className="">
                                    <Image strokeWidth={2} size={16} />
                                </div>
                            ),
                            className: 'flex items-center justify-center',
                        }}
                        modalTitle="Send Image"
                    >
                        {(close) => {
                            return (
                                <FormBuilder<SendUserTicketIV1Post>
                                    fields={[{ label: 'Image', name: 'content', type: NKFormType.UPLOAD_IMAGE, span: 3 }]}
                                    apiAction={(data) => {
                                        return userTicketApi.v1PostSendById(id, {
                                            ...data,
                                            type: 'IMAGE',
                                        });
                                    }}
                                    onExtraSuccessAction={() => {
                                        close();
                                        userTicket.refetch();
                                    }}
                                    defaultValues={{
                                        content: '',
                                        type: 'IMAGE',
                                    }}
                                    schema={{
                                        content: joi.string().required(),
                                        type: joi.string().required(),
                                    }}
                                    title=""
                                />
                            );
                        }}
                    </ModalBuilder>
                </div>
            </div>
        </div>
    );
};

export default Page;
