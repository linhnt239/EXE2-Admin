'use client';

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
import UnAuthWrapper from '@/core/components/wrapper/UnAuthWrapper';
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
                cookies.set(NKConstant.TOKEN_COOKIE_KEY, data.token, {
                    path: '/',
                });
                store.dispatch(userActions.setToken(data.token));
                window.location.reload();
            },
        },
    );

    return (
        <UnAuthWrapper>
            <div
                className="flex min-h-screen  bg-gray-900  bg-cover"
                style={{
                    backgroundImage: "url('../assets/images/bg.png')'",
                }}
            >
                <div className="relative flex-1" style={{}}>
                    <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="absolute left-0 top-0 h-full w-full object-cover"
                    />
                    <div className="stroke  text-stroke absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 border border-black stroke-emerald-200 text-center text-4xl font-bold capitalize text-white">
                        Find your own bridge
                    </div>
                    <div className="absolute left-4 top-4">
                        <img
                            src="https://uortjlczjmucmpaqqhqm.supabase.co/storage/v1/object/public/firejet-converted-images/images/33%3A554.webp"
                            alt="logo"
                        />
                    </div>
                </div>
                <div className="flex flex-1 items-center justify-center bg-white">
                    <div className="w-full max-w-xs">
                        <NKFormWrapper formMethods={formMethods} formActionError={authLoginMutation.error}>
                            <form
                                className="fade-in flex   flex-col rounded-lg bg-white  py-16"
                                onSubmit={formMethods.handleSubmit((data) => {
                                    authLoginMutation.mutate(data);
                                })}
                            >
                                <div className="mb-4 flex-1 text-center text-lg font-semibold text-black">Admin Login</div>
                                <div className="flex w-full flex-col gap-4">
                                    <NKTextField name="email" label="Email" />
                                    <NKTextField name="password" label="Password" type="password" />
                                    <Button htmlType="submit" type="primary" loading={authLoginMutation.isLoading}>
                                        Sign In
                                    </Button>
                                </div>
                            </form>
                        </NKFormWrapper>
                    </div>
                </div>
            </div>
        </UnAuthWrapper>
    );
}
