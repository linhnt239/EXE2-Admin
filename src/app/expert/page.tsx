'use client';

import * as React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import { Button } from 'antd';
import joi from 'joi';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

import { NKConstant } from '@/core/NKConstant';
import { IV1AuthLoginEmail, authApi } from '@/core/api/auth.api';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import NKTextField from '@/core/components/form/NKTextField';
import { RootState, store } from '@/core/store';
import { UserState, userActions } from '@/core/store/user';

const defaultValues: IV1AuthLoginEmail = {
    email: '',
    password: '',
};

export default function Page() {
    const { isAuth } = useSelector<RootState, UserState>((state) => state.user);
    const router = useRouter();
    const formMethods = useForm({
        defaultValues,

        resolver: joiResolver(
            joi.object({
                email: joi.string().email({ tlds: false }).required(),
                password: joi.string().required(),
            }),
        ),
    });
    const authLoginMutation = useMutation(
        (data: IV1AuthLoginEmail) => {
            return authApi.v1Login(data);
        },
        {
            onSuccess: (data) => {
                const cookies = new Cookies();
                cookies.set(NKConstant.TOKEN_COOKIE_KEY, data.token);
                store.dispatch(userActions.setToken(data.token));
            },
        },
    );

    React.useEffect(() => {
        if (isAuth) {
            router.push(NKConstant.AUTH_EXPERT_SUCCESS_FALLBACK_ROUTE);
        }
    }, [isAuth]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGV4cGVydHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80')] bg-cover">
            <NKFormWrapper formMethods={formMethods} formActionError={authLoginMutation.error}>
                <form
                    className="fade-in flex w-96 flex-col rounded-lg bg-white px-8 py-16"
                    onSubmit={formMethods.handleSubmit((data) => {
                        authLoginMutation.mutate(data);
                    })}
                >
                    <div className="mb-4 flex-1 text-center text-lg font-semibold text-black">Expert Login</div>
                    <div className="flex w-full flex-col gap-4">
                        <NKTextField name="email" label="Email" />
                        <NKTextField name="password" label="Password" type="password" />
                        <Button htmlType="submit" type="primary" loading={authLoginMutation.isLoading}>
                            Sign In
                        </Button>
                    </div>
                    <div className="mt-5 text-center">
                        <Link href={'/'} className="no-underline">
                            <span className="text-xs font-semibold text-blue-500 ">Login as Admin</span>
                        </Link>
                    </div>
                </form>
            </NKFormWrapper>
        </div>
    );
}
